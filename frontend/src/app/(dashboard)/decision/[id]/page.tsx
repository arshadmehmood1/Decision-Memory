'use client';

import * as React from 'react';
import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/Card';
import {
    Calendar,
    User,
    ArrowLeft,
    Edit3,
    CheckCircle2,
    XCircle,
    RotateCcw,
    AlertCircle,
    Clock,
    Zap,
    Brain,
    Shield,
    Target,
    ArrowRight,
    TrendingUp,
    MessageSquare,
    ChevronRight,
    Sparkles,
    EyeOff,
    Flag,
    MessageCircle,
    Send,
    BrainCircuit,
    Download,
    ShieldCheck
} from 'lucide-react';
import { Textarea } from '@/components/ui/Textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import { Switch } from '@/components/ui/Switch';
import { Label } from '@/components/ui/Label';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { formatDate, cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore, Decision } from '@/lib/store';
import { toast } from 'sonner';

const statusVariants: Record<string, any> = {
    ACTIVE: 'warning',
    SUCCEEDED: 'success',
    FAILED: 'danger',
    REVERSED: 'danger',
    DRAFT: 'secondary',
};

export default function DecisionDetailPage() {
    const params = useParams();
    const router = useRouter();
    const { decisions, updateDecisionStatus, currentUser, addComment, analyzeBlindspots, checkAssumption, fetchComments } = useStore();
    const [showOutcomeFlow, setShowOutcomeFlow] = useState(false);
    const [activeTab, setActiveTab] = useState<'trace' | 'reviews'>('trace');
    const [newComment, setNewComment] = useState('');
    const [isAnonymousReview, setIsAnonymousReview] = useState(false);

    React.useEffect(() => {
        if (params.id) {
            fetchComments(params.id as string);
        }
    }, [params.id, fetchComments]);

    // AI State
    const [blindspots, setBlindspots] = useState<{ id: string; type: string; title: string; desc: string; severity: string }[]>([
        { id: '1', type: 'BIAS', title: 'Start Audit', desc: 'Click Refresh Audit to analyze this decision for cognitive biases.', severity: 'LOW' }
    ]);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [assumptionChecks, setAssumptionChecks] = useState<Record<string, { score: number; issues: string[] }>>({});

    const decision = useMemo(() => {
        return decisions.find(d => d.id === params.id);
    }, [decisions, params.id]);

    if (!decision) {
        return (
            <div className="flex flex-col items-center justify-center py-40 text-center animate-in fade-in zoom-in duration-500">
                <div className="w-24 h-24 bg-white/5 rounded-[2rem] flex items-center justify-center text-gray-700 mb-8 border border-white/10 shadow-premium">
                    <AlertCircle size={48} />
                </div>
                <h2 className="text-3xl font-black text-white">Trace Exhausted</h2>
                <p className="text-gray-400 mb-10 max-w-sm font-bold uppercase tracking-widest text-[10px]">The decision log you're attempting to access does not exist in the current neural workspace.</p>
                <Link href="/dashboard">
                    <Button variant="outline" className="rounded-2xl h-14 px-10 text-lg font-black border-white/10 bg-white/5 text-white hover:bg-white/10">
                        Return to Hub
                    </Button>
                </Link>
            </div>
        );
    }

    const handleUpdateStatus = (status: Decision['status']) => {
        updateDecisionStatus(decision.id, status);
        setShowOutcomeFlow(false);
        toast.success(`Outcome Recorded: ${status}`, {
            description: "The neural trace has been updated to reflect the final reality.",
            icon: status === 'SUCCEEDED' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />,
        });
    };

    const handleRefreshAudit = async () => {
        setIsAnalyzing(true);
        toast.message("Neural Engine Active", { description: "Scanning decision trace for cognitive anomalies..." });

        try {
            const results = await analyzeBlindspots(decision!);

            if (results.length === 0) {
                setBlindspots([{ id: '1', type: 'CLEAN', title: 'No Biases Detected', desc: 'The neural engine did not detect common cognitive traps.', severity: 'LOW' }]);
            } else {
                const parsed = results.map((r, i) => {
                    const [title, desc] = r.split(': ');
                    return {
                        id: `gen-${i}`,
                        type: 'RISK', // Default type
                        title: title || 'Potential Issue',
                        desc: desc || r,
                        severity: r.includes('Confirmation') ? 'HIGH' : 'MEDIUM'
                    };
                });
                setBlindspots(parsed);
                toast.success("Audit Complete", { description: `${results.length} potential blindspots detected.` });
            }
        } catch (e) {
            toast.error("Analysis Failed");
        } finally {
            setIsAnalyzing(false);
        }
    };

    const handleVerifyAssumption = async (id: string, text: string) => {
        const result = await checkAssumption(text);
        setAssumptionChecks(prev => ({ ...prev, [id]: result }));
        toast.info("Assumption Verified", { description: `Quality Score: ${result.score}/100` });
    };

    const handleAddComment = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newComment.trim()) return;
        addComment(decision.id, newComment, isAnonymousReview);
        setNewComment('');
        setIsAnonymousReview(false);
        toast.success("Review Logged", {
            description: isAnonymousReview ? "Your anonymous feedback has been encrypted." : "Your review is now visible to the workspace."
        });
    };

    return (
        <div className="max-w-6xl mx-auto pb-32 space-y-12">
            {/* Breadcrumb / Top Nav */}
            <div className="flex items-center justify-between px-4">
                <Link href="/dashboard" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-primary transition-colors group">
                    <ArrowLeft size={14} strokeWidth={3} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Workspace
                </Link>
                <div className="flex items-center gap-6">
                    <div className="hidden md:flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-500">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-glow"></span>
                        Status: <span className="text-white">{decision.status}</span>
                    </div>
                </div>
            </div>

            {/* Cinematic Hero Section */}
            <Card variant="glass" className="p-0 border-none overflow-hidden h-auto md:h-80 shadow-glow relative group bg-white/5">
                <div className="absolute inset-0 bg-hero-gradient opacity-10" />
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full -mr-64 -mt-64 blur-[120px] transition-colors duration-1000" />

                <div className="relative z-10 p-10 md:p-14 flex flex-col md:flex-row justify-between items-start md:items-end gap-10 h-full">
                    <div className="space-y-6 flex-1">
                        <div className="flex flex-wrap items-center gap-3">
                            <Badge variant={statusVariants[decision.status] || 'default'} className="h-8 px-4 text-[10px] font-black uppercase tracking-widest">
                                {decision.status}
                            </Badge>
                            <Badge variant="outline" className="h-8 px-4 text-[10px] font-black uppercase tracking-widest border-white/10 bg-white/5 text-blue-400">
                                {decision.category}
                            </Badge>
                            <div className="w-px h-4 bg-white/10 mx-1 hidden sm:block" />
                            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-500">
                                <Calendar size={14} className="text-blue-500/50" />
                                {formatDate(decision.madeOn)}
                            </div>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-black text-white leading-[1.1] tracking-tighter max-w-4xl">
                            {decision.title}
                        </h1>
                    </div>

                    <div className="flex gap-4 w-full md:w-auto">
                        <div className="flex gap-4 w-full md:w-auto">
                            <Link href={`/decision/${decision.id}/edit`}>
                                <Button variant="outline" className="flex-1 md:flex-none h-14 px-8 rounded-2xl border-white/10 bg-white/5 hover:bg-white/10 shadow-soft font-black text-xs uppercase tracking-widest transition-all active:scale-90 text-white">
                                    <Edit3 size={18} className="mr-2" />
                                    Edit Trace
                                </Button>
                            </Link>
                            <Button variant="outline" onClick={() => window.print()} className="hidden md:flex flex-1 md:flex-none h-14 px-8 rounded-2xl border-white/10 bg-white/5 hover:bg-white/10 shadow-soft font-black text-xs uppercase tracking-widest transition-all active:scale-90 text-white no-print">
                                <Download size={18} className="mr-2" />
                                Export PDF
                            </Button>
                            <Button onClick={() => setShowOutcomeFlow(true)} className="flex-1 md:flex-none h-14 px-10 rounded-2xl shadow-glow font-black text-sm uppercase tracking-widest transition-all active:scale-90 group">
                                Record Reality
                                <ChevronRight size={20} className="ml-2 mt-0.5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Tabs */}
            <div className="flex items-center gap-8 border-b border-white/5 px-4 h-12">
                <button
                    onClick={() => setActiveTab('trace')}
                    className={cn(
                        "h-full px-4 text-xs font-black uppercase tracking-widest border-b-2 transition-all flex items-center gap-2",
                        activeTab === 'trace' ? "border-primary text-white" : "border-transparent text-gray-500 hover:text-gray-300"
                    )}
                >
                    <BrainCircuit size={16} /> Neural Trace
                </button>
                <button
                    onClick={() => setActiveTab('reviews')}
                    className={cn(
                        "h-full px-4 text-xs font-black uppercase tracking-widest border-b-2 transition-all flex items-center gap-2",
                        activeTab === 'reviews' ? "border-primary text-white" : "border-transparent text-gray-500 hover:text-gray-300"
                    )}
                >
                    <MessageCircle size={16} /> Team Reviews
                    <Badge className="bg-white/10 text-white ml-2 h-5 px-1.5 min-w-[1.25rem]">{decision.comments?.length || 0}</Badge>
                </button>
            </div >

            {activeTab === 'trace' ? (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {/* Main Trace Timeline */}
                    <div className="lg:col-span-8 space-y-16">

                        {/* The Core Choice Section */}
                        <div className="relative pl-12 border-l-4 border-dashed border-white/5 py-4">
                            <div className="absolute -left-[14px] top-0 w-6 h-6 rounded-full bg-primary shadow-glow border-4 border-black z-10" />

                            <div className="space-y-8">
                                <div className="space-y-2">
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 flex items-center gap-2">
                                        <Target size={14} className="text-primary" />
                                        01. The Prime Resolution
                                    </h3>
                                    <div className="p-10 bg-white/5 border border-white/10 rounded-[2.5rem] shadow-premium relative group">
                                        <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-6 h-px bg-white/10" />
                                        <p className="text-3xl font-black text-white leading-relaxed tracking-tighter">
                                            "{decision.decision}"
                                        </p>
                                        <MessageSquare className="absolute bottom-6 right-8 text-primary/20 group-hover:text-primary transition-colors" size={40} />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 flex items-center gap-2">
                                        <Brain size={14} className="text-primary" />
                                        02. Strategic Context
                                    </h3>
                                    <p className="text-xl text-gray-400 font-bold leading-relaxed pl-6 border-l-2 border-white/5 italic">
                                        {decision.context}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* AI Blindspot Engine */}
                        <div className="space-y-10 bg-white/5 p-12 rounded-[3.5rem] border border-white/5 shadow-premium">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <h3 className="text-3xl font-black text-white flex items-center gap-3 tracking-tighter">
                                        <Sparkles className="text-purple-400 animate-pulse" size={28} />
                                        AI Insight Ledger
                                    </h3>
                                    <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.3em]">Identifying hidden patterns & biases</p>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={handleRefreshAudit}
                                    disabled={isAnalyzing}
                                    className="rounded-xl h-12 px-6 text-[10px] font-black uppercase tracking-widest border border-purple-500/20 bg-purple-500/5 text-purple-400 shadow-glow shadow-purple-500/5 hover:bg-purple-500/10"
                                >
                                    {isAnalyzing ? 'Analyzing...' : 'Refresh Audit'}
                                </Button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {isAnalyzing ? (
                                    <div className="col-span-3 py-10 text-center animate-pulse">
                                        <Brain className="w-12 h-12 mx-auto text-purple-400 mb-4 opacity-50" />
                                        <p className="text-xs font-black uppercase tracking-widest text-[#8b949e]">Neural Engine Processing...</p>
                                    </div>
                                ) : (
                                    blindspots.map((spot) => (
                                        <Card key={spot.id} className="rounded-3xl border-none shadow-glow bg-white/5 group hover:bg-white/10 transition-all border border-white/5">
                                            <CardContent className="p-8 space-y-6">
                                                <Badge className={cn(
                                                    "rounded-full text-[10px] font-black uppercase tracking-widest h-6 px-3",
                                                    spot.severity === 'HIGH' ? "bg-red-500/10 text-red-400" :
                                                        spot.severity === 'MEDIUM' ? "bg-amber-500/10 text-amber-400" : "bg-blue-500/10 text-blue-400"
                                                )}>
                                                    {spot.severity}
                                                </Badge>
                                                <div className="space-y-2">
                                                    <h5 className="font-black text-white text-base flex items-center justify-between">
                                                        {spot.title}
                                                        <Zap size={16} className="text-purple-400 shadow-glow" />
                                                    </h5>
                                                    <p className="text-xs text-gray-400 leading-relaxed font-bold">{spot.desc}</p>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))
                                )}
                            </div>
                        </div>

                        {/* Logic Gates (Alternatives) */}
                        <div className="relative pl-12 border-l-4 border-dashed border-white/5 py-4">
                            <div className="absolute -left-[14px] top-0 w-6 h-6 rounded-full bg-white/10 border-4 border-black z-10" />

                            <div className="space-y-8">
                                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 flex items-center gap-2">
                                    <RotateCcw size={14} className="text-gray-400" />
                                    03. Rejected Paths (Logic Gates)
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {decision.alternatives.map((alt, idx) => (
                                        <div key={idx} className="p-8 rounded-[2.5rem] bg-white/2 border border-white/5 shadow-premium group hover:border-white/10 transition-all hover:bg-white/5">
                                            <div className="flex items-center gap-4 mb-6">
                                                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-gray-500 group-hover:bg-red-500/10 group-hover:text-red-400 transition-colors">
                                                    <EyeOff size={20} />
                                                </div>
                                                <h4 className="text-lg font-black text-white">{alt.name}</h4>
                                            </div>
                                            <div className="space-y-3">
                                                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Rejection Catalyst</p>
                                                <p className="text-sm text-gray-400 leading-relaxed font-bold">
                                                    {alt.whyRejected}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Success Benchmarks */}
                        <div className="relative pl-12 border-l-4 border-dashed border-white/5 py-4">
                            <div className="absolute -left-[14px] top-0 w-6 h-6 rounded-full bg-green-500 shadow-glow border-4 border-black z-10" />

                            <div className="space-y-8">
                                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 flex items-center gap-2">
                                    <TrendingUp size={14} className="text-green-500" />
                                    04. Predicted Success Benchmarks
                                </h3>

                                <div className="grid grid-cols-1 gap-4">
                                    {decision.successCriteria.map((criteria, idx) => (
                                        <div key={idx} className="flex group items-center p-8 bg-white/2 border border-white/5 rounded-3xl hover:bg-green-500/5 hover:border-green-500/20 transition-all">
                                            <div className="w-12 h-12 rounded-[1.25rem] bg-green-500/10 text-green-400 flex items-center justify-center shrink-0 mr-6 shadow-glow shadow-green-500/5">
                                                <Flag size={20} strokeWidth={4} />
                                            </div>
                                            <p className="text-base font-black text-white flex-1">{criteria.value}</p>
                                            <Badge variant="outline" className="border-white/10 bg-white/5 text-[10px] font-black text-gray-500 uppercase tracking-widest px-4 h-8 flex items-center">PENDING AUDIT</Badge>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Intelligence Panel */}
                    <div className="lg:col-span-4 space-y-10 sticky top-24">

                        {/* Trace Metadata */}
                        <Card className="rounded-[2.5rem] border border-white/10 shadow-premium bg-white/5 p-2 overflow-hidden">
                            <CardContent className="p-10 space-y-10">
                                <div className="space-y-8">
                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between group cursor-default">
                                            <div className="flex items-center gap-4 text-gray-500 group-hover:text-primary transition-colors">
                                                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-500 group-hover:bg-primary/10 group-hover:text-primary transition-colors border border-white/10">
                                                    <User size={16} />
                                                </div>
                                                <span className="text-[11px] font-black uppercase tracking-[0.2em]">Authority</span>
                                            </div>
                                            <span className="font-black text-white text-base tracking-tight">{decision.madeBy}</span>
                                        </div>
                                        <div className="flex items-center justify-between group cursor-default">
                                            <div className="flex items-center gap-4 text-gray-500 group-hover:text-primary transition-colors">
                                                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-500 group-hover:bg-primary/10 group-hover:text-primary transition-colors border border-white/10">
                                                    <Shield size={16} />
                                                </div>
                                                <span className="text-[11px] font-black uppercase tracking-[0.2em]">Inference</span>
                                            </div>
                                            <span className="font-black text-blue-400 text-base italic tracking-tight">Standard Path</span>
                                        </div>
                                        <div className="flex items-center justify-between group cursor-default">
                                            <div className="flex items-center gap-4 text-gray-500 group-hover:text-primary transition-colors">
                                                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-500 group-hover:bg-primary/10 group-hover:text-primary transition-colors border border-white/10">
                                                    <Clock size={16} />
                                                </div>
                                                <span className="text-[11px] font-black uppercase tracking-[0.2em]">Audit Due</span>
                                            </div>
                                            <Badge variant="secondary" className="font-black text-[10px] bg-red-500/10 text-red-400 border-none px-4 h-8 flex items-center uppercase tracking-widest">In 14 Days</Badge>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Assumptions Inventory */}
                        <div className="space-y-6">
                            <div className="flex items-center justify-between px-4">
                                <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] flex items-center gap-3">
                                    <Zap size={14} className="text-amber-400 shadow-glow" />
                                    Base Assumptions
                                </h4>
                                <Badge className="bg-white/5 text-amber-400 text-[10px] border border-amber-400/20 px-3 h-6 flex items-center">{decision.assumptions.length}</Badge>
                            </div>
                            <div className="space-y-4">
                                {decision.assumptions.map((assumption, idx) => (
                                    <motion.div
                                        key={idx}
                                        whileHover={{ x: 4 }}
                                        className="p-8 rounded-[2rem] bg-white/5 border border-white/5 shadow-premium flex flex-col gap-6 group hover:border-amber-400/30 transition-all cursor-default"
                                    >
                                        <p className="text-base font-black text-white leading-relaxed">{assumption.value}</p>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="flex-1 h-1.5 w-24 bg-black rounded-full overflow-hidden border border-white/5">
                                                    <div
                                                        className={cn("h-full transition-all duration-1000", assumptionChecks[assumption.id || idx] ? "bg-green-500" : "bg-amber-400")}
                                                        style={{ width: assumptionChecks[assumption.id || idx] ? `${assumptionChecks[assumption.id || idx].score}%` : '33%' }}
                                                    />
                                                </div>
                                                <span className={cn("text-[10px] font-black uppercase tracking-widest", assumptionChecks[assumption.id || idx] ? "text-green-500" : "text-amber-400/60")}>
                                                    {assumptionChecks[assumption.id || idx] ? `${assumptionChecks[assumption.id || idx].score}% Confidence` : "UNVERIFIED Path"}
                                                </span>
                                            </div>

                                            {!assumptionChecks[assumption.id || idx] && (
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleVerifyAssumption(assumption.id || String(idx), assumption.value)}
                                                    className="h-8 px-4 rounded-lg text-[9px] font-black uppercase tracking-widest border border-white/10 hover:bg-white/10"
                                                >
                                                    Verify
                                                </Button>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="max-w-3xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {/* Review Input */}
                    <Card className="bg-[#0d1117] border border-[#30363d] overflow-hidden">
                        <div className="p-6 space-y-6">
                            <div className="flex items-start gap-4">
                                <Avatar className="w-10 h-10 border border-[#30363d]">
                                    <AvatarFallback className="bg-[#21262d] text-xs font-bold text-[#c9d1d9]">
                                        {isAnonymousReview ? <EyeOff size={16} /> : (currentUser?.name?.substring(0, 2).toUpperCase() || "ME")}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1 space-y-4">
                                    <Textarea
                                        value={newComment}
                                        onChange={(e) => setNewComment(e.target.value)}
                                        placeholder={isAnonymousReview ? "Write an uncensored, anonymous review..." : "Add your perspective to this decision trace..."}
                                        className="min-h-[120px] resize-none bg-[#0d1117] border-[#30363d] focus:border-[#1f6feb] text-base"
                                    />
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2 bg-[#21262d] px-3 py-1.5 rounded-lg border border-[#30363d]">
                                            <Switch
                                                id="anonymous-mode"
                                                checked={isAnonymousReview}
                                                onCheckedChange={setIsAnonymousReview}
                                            />
                                            <Label htmlFor="anonymous-mode" className="text-xs font-bold text-[#c9d1d9] cursor-pointer select-none flex items-center gap-2">
                                                {isAnonymousReview ? <EyeOff size={14} className="text-[#f85149]" /> : <User size={14} />}
                                                {isAnonymousReview ? "Anonymous Mode ON" : "Public Mode"}
                                            </Label>
                                        </div>
                                        <Button
                                            onClick={handleAddComment}
                                            disabled={!newComment.trim()}
                                            className="h-10 px-6 font-bold text-xs uppercase tracking-widest gap-2 bg-[#238636] hover:bg-[#2ea043] text-white disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <Send size={14} /> Submit Review
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {isAnonymousReview && (
                            <div className="bg-[#f85149]/10 border-t border-[#f85149]/20 p-3 flex items-center gap-3 text-xs text-[#f85149] font-bold px-6">
                                <EyeOff size={14} />
                                Your identity will be completely hidden from the workspace owner.
                            </div>
                        )}
                    </Card>

                    {/* Reviews List */}
                    <div className="space-y-6">
                        <h3 className="text-sm font-bold text-[#8b949e] uppercase tracking-wider pl-2">Previous Reviews</h3>
                        {decision.comments && decision.comments.length > 0 ? (
                            decision.comments.map((comment) => (
                                <div key={comment.id} className="group relative pl-8 pb-8 border-l-2 border-[#30363d] last:border-l-0 last:pb-0">
                                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#0d1117] border-2 border-[#30363d] group-hover:border-[#1f6feb] transition-colors" />

                                    <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-6 space-y-4 group-hover:border-[#8b949e]/30 transition-colors">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <Avatar className="w-8 h-8 border border-[#30363d]">
                                                    <AvatarFallback className={cn("text-[10px] font-bold", comment.isAnonymous ? "bg-[#21262d] text-[#8b949e]" : "bg-[#1f6feb]/20 text-[#1f6feb]")}>
                                                        {comment.isAnonymous ? <EyeOff size={14} /> : comment.author.substring(0, 2).toUpperCase()}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-sm font-bold text-[#c9d1d9]">
                                                            {comment.isAnonymous ? "Anonymous Member" : comment.author}
                                                        </span>
                                                        {!comment.isAnonymous && (
                                                            <Badge variant="outline" className="text-[9px] h-5 px-1.5 border-[#30363d] text-[#8b949e] uppercase tracking-widest bg-[#0d1117]">
                                                                {comment.role}
                                                            </Badge>
                                                        )}
                                                    </div>
                                                    <div className="text-[10px] text-[#8b949e] font-mono mt-0.5">{formatDate(comment.createdAt)}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-sm text-[#c9d1d9] leading-relaxed">
                                            {comment.content}
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-12 border border-dashed border-[#30363d] rounded-2xl bg-[#0d1117]/50">
                                <MessageCircle size={32} className="text-[#30363d] mx-auto mb-4" />
                                <p className="text-[#8b949e] text-sm font-bold">No reviews yet.</p>
                                <p className="text-[#8b949e] text-xs mt-1">Be the first to share your thoughts.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Outcome Recording Flow - Premium Modal */}
            <AnimatePresence>
                {showOutcomeFlow && (
                    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 backdrop-blur-xl animate-in fade-in duration-300">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="w-full max-w-xl"
                        >
                            <Card className="rounded-[3rem] shadow-2xl border border-white/10 p-4 bg-black overflow-hidden relative">
                                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-primary to-purple-500 shadow-glow" />
                                <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-[100px]" />
                                <CardHeader className="text-center pb-8 pt-12 relative z-10">
                                    <div className="w-20 h-20 bg-primary/10 border border-primary/20 rounded-[2rem] flex items-center justify-center text-primary mx-auto mb-8 shadow-glow">
                                        <CheckCircle2 size={40} strokeWidth={3} />
                                    </div>
                                    <CardTitle className="text-4xl font-black text-white tracking-tighter uppercase">Record Reality</CardTitle>
                                    <p className="text-gray-500 font-bold mt-3 uppercase tracking-widest text-[10px]">How did reality align with the strategic trace?</p>
                                </CardHeader>
                                <CardContent className="space-y-6 p-8 relative z-10">
                                    <div className="grid grid-cols-1 gap-6">
                                        <button
                                            onClick={() => handleUpdateStatus('SUCCEEDED')}
                                            className="group flex items-center gap-8 p-8 rounded-[2.5rem] border-2 border-white/5 hover:border-success/50 hover:bg-success/5 transition-all text-left bg-white/5"
                                        >
                                            <div className="w-20 h-20 rounded-[1.5rem] bg-success/10 flex items-center justify-center text-success shrink-0 group-hover:scale-110 group-hover:bg-success group-hover:text-white transition-all duration-300 shadow-glow shadow-success/10">
                                                <Target size={40} />
                                            </div>
                                            <div className="flex-1">
                                                <h5 className="font-black text-white text-xl">Mission Succeeded</h5>
                                                <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">Reality surpassed all criteria.</p>
                                            </div>
                                            <ChevronRight className="text-gray-700 group-hover:text-success transition-colors" />
                                        </button>

                                        <button
                                            onClick={() => handleUpdateStatus('FAILED')}
                                            className="group flex items-center gap-8 p-8 rounded-[2.5rem] border-2 border-white/5 hover:border-red-500/50 hover:bg-red-500/5 transition-all text-left bg-white/5"
                                        >
                                            <div className="w-20 h-20 rounded-[1.5rem] bg-red-500/10 flex items-center justify-center text-red-500 shrink-0 group-hover:scale-110 group-hover:bg-red-500 group-hover:text-white transition-all duration-300 shadow-glow shadow-red-500/10">
                                                <XCircle size={40} />
                                            </div>
                                            <div className="flex-1">
                                                <h5 className="font-black text-white text-xl">Trace Deviation</h5>
                                                <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">Assumptions were invalidated.</p>
                                            </div>
                                            <ChevronRight className="text-gray-700 group-hover:text-red-500 transition-colors" />
                                        </button>

                                        <button
                                            onClick={() => handleUpdateStatus('REVERSED')}
                                            className="group flex items-center gap-8 p-8 rounded-[2.5rem] border-2 border-white/5 hover:border-primary/50 hover:bg-primary/5 transition-all text-left bg-white/5"
                                        >
                                            <div className="w-20 h-20 rounded-[1.5rem] bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-glow shadow-primary/10">
                                                <RotateCcw size={40} />
                                            </div>
                                            <div className="flex-1">
                                                <h5 className="font-black text-white text-xl">Strategic Pivot</h5>
                                                <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">Manual course adjustment applied.</p>
                                            </div>
                                            <ChevronRight className="text-gray-700 group-hover:text-primary transition-colors" />
                                        </button>
                                    </div>
                                </CardContent>
                                <CardFooter className="flex justify-center p-10 bg-white/5 border-t border-white/5">
                                    <Button variant="ghost" onClick={() => setShowOutcomeFlow(false)} className="rounded-2xl px-12 h-14 font-black uppercase tracking-widest text-xs text-gray-500 hover:text-white transition-colors">
                                        Back to Trace
                                    </Button>
                                </CardFooter>
                            </Card>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div >
    );
}
