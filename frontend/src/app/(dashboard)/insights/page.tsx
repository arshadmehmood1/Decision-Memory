'use client';

import { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
    Brain,
    TrendingUp,
    AlertCircle,
    Target,
    Zap,
    Clock,
    ShieldCheck,
    BarChart3,
    ArrowRight,
    Sparkles,
    ChevronRight,
    Activity,
    Layers,
    Filter
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/lib/store';
import { FeatureLock } from '@/components/feature-lock';

// ... imports
// ... imports

export default function InsightsPage() {
    const { decisions, insights, fetchInsights } = useStore();

    useEffect(() => {
        fetchInsights();
    }, [fetchInsights]);

    const stats = useMemo(() => {
        const total = decisions.length;
        const succeeded = decisions.filter(d => d.status === 'SUCCEEDED').length;
        const active = decisions.filter(d => d.status === 'ACTIVE').length;
        const failed = decisions.filter(d => d.status === 'FAILED').length;
        const rate = total > 0 ? Math.round((succeeded / total) * 100) : 0;

        return [
            { label: 'Total Logs', value: total, icon: Clock, color: 'text-blue-400', bg: 'bg-blue-500/10' },
            { label: 'Success Rate', value: `${rate}%`, icon: TrendingUp, color: 'text-green-400', bg: 'bg-green-500/10' },
            { label: 'Active Drafts', value: active, icon: Sparkles, color: 'text-purple-400', bg: 'bg-purple-500/10' },
            { label: 'Failed/Regrets', value: failed, icon: AlertCircle, color: 'text-red-400', bg: 'bg-red-500/10' },
        ];
    }, [decisions]);

    return (
        <div className="space-y-10 pb-24 max-w-[1600px] mx-auto">
            {/* Standard Header */}
            <div className="flex flex-col gap-2 pb-6 border-b border-white/5">
                <div className="flex items-center gap-3">
                    <Badge variant="outline" className="border-primary/20 bg-primary/5 text-primary text-[10px] font-bold uppercase tracking-widest px-3 h-7">
                        Neural Engine Active
                    </Badge>
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Connected to Neural Engine</span>
                </div>
                <h1 className="text-3xl font-black text-white tracking-tight">Intelligence Insights</h1>
                <p className="text-gray-400 font-medium max-w-3xl">AI-powered pattern detection across your last 48 strategic choices. Identifying cognitive biases and growth vectors in real-time.</p>
            </div>

            {/* Real-time Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                    >
                        <Card className="p-6 border border-white/5 bg-white/5 hover:bg-white/10 transition-all duration-200 shadow-none hover:border-white/10 group rounded-[2rem]">
                            <div className="flex items-start justify-between">
                                <div className="space-y-4">
                                    <div className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">{stat.label}</div>
                                    <div className="flex items-center gap-4">
                                        <div className="text-3xl font-bold text-white tracking-tight">{stat.value}</div>
                                        <div className={cn("p-1.5 rounded-lg bg-white/5 text-gray-400 group-hover:text-white transition-colors", stat.color.replace('text-', 'text-opacity-80 text-'))}>
                                            <stat.icon size={16} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

                {/* Cognitive Feedback Feed */}
                <div className="lg:col-span-8 space-y-10">
                    <div className="flex items-center justify-between px-2">
                        <div className="space-y-1">
                            <h3 className="text-3xl font-black text-white flex items-center gap-4">
                                <Brain className="text-purple-400 animate-pulse" size={28} />
                                Active Pattern Feed
                            </h3>
                            <p className="text-sm text-gray-500 font-bold uppercase tracking-widest">Cognitive anomalies detected by engine</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Button variant="outline" size="sm" className="rounded-xl h-12 px-6 text-[10px] font-black uppercase tracking-widest border-white/10 bg-white/5 text-white">
                                <Filter size={16} className="mr-2" />
                                Filter Bias
                            </Button>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <FeatureLock feature="AI_INSIGHTS">
                            {insights.length > 0 ? (
                                insights.map((insight, i) => (
                                    <motion.div
                                        key={insight.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                    >
                                        <Card className="rounded-[2.5rem] border border-white/5 shadow-premium overflow-hidden group hover:border-primary/20 transition-all bg-white/5 relative">
                                            <div className={cn(
                                                "absolute top-0 left-0 bottom-0 w-2",
                                                insight.impact === 'HIGH' ? "bg-red-500" : insight.impact === 'MEDIUM' ? "bg-amber-500" : "bg-blue-500"
                                            )} />
                                            <CardContent className="p-0">
                                                <div className="flex flex-col md:flex-row h-full">
                                                    <div className="flex-1 p-10 space-y-8">
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center gap-4">
                                                                <Badge variant="outline" className="border-white/10 bg-white/5 text-gray-500 text-[10px] font-black uppercase tracking-widest h-8 px-4">
                                                                    ID: IN-{insight.id}
                                                                </Badge>
                                                                <Badge className={cn(
                                                                    "rounded-full text-[10px] font-black uppercase tracking-widest h-8 px-4",
                                                                    insight.impact === 'HIGH' ? "bg-red-500/10 text-red-400" : insight.impact === 'MEDIUM' ? "bg-amber-500/10 text-amber-400" : "bg-blue-500/10 text-blue-400"
                                                                )}>
                                                                    {insight.impact} IMPACT
                                                                </Badge>
                                                            </div>
                                                            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Confidence: {insight.confidence}%</span>
                                                        </div>

                                                        <div className="space-y-4">
                                                            <h4 className="text-3xl font-black text-white group-hover:text-primary transition-colors tracking-tight leading-none">{insight.title}</h4>
                                                            <p className="text-gray-400 leading-relaxed font-bold text-lg">{insight.description}</p>
                                                        </div>

                                                        <div className="pt-8 border-t border-white/5 flex flex-col gap-6">
                                                            <div className="flex items-center gap-3">
                                                                <Zap size={16} className="text-amber-400" />
                                                                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest font-bold">Mitigation Strategy</p>
                                                            </div>
                                                            <div className="p-8 bg-white/5 rounded-3xl border border-white/5 italic transition-all group-hover:bg-primary/5 group-hover:border-primary/20">
                                                                <p className="text-white font-black text-lg leading-relaxed">
                                                                    "{insight.action}"
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="md:w-32 bg-white/5 flex flex-col items-center justify-center border-l border-white/5 group-hover:bg-primary transition-colors duration-500">
                                                        <button className="w-16 h-16 bg-white/5 rounded-2xl border border-white/10 shadow-soft flex items-center justify-center text-white group-hover:scale-110 transition-all active:scale-95 group-hover:shadow-glow">
                                                            <ArrowRight size={28} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                ))
                            ) : (
                                <Card className="p-10 border border-white/5 bg-white/5 text-center rounded-[2.5rem]">
                                    <p className="text-gray-400 font-bold uppercase tracking-widest">No patterns detected yet. Log more decisions.</p>
                                </Card>
                            )}
                        </FeatureLock>
                    </div>
                </div>

                {/* Sidebar Analysis - Reserved for Future Pattern matching */}
                <div className="lg:col-span-4 space-y-12 sticky top-24">
                    <div className="p-8 rounded-[2.5rem] border border-white/5 bg-white/5 text-center">
                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Advanced Pattern Matching incoming</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
