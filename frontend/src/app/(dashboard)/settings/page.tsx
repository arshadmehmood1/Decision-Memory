'use client';

import * as React from 'react';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Badge } from '@/components/ui/Badge';
import {
    Settings as SettingsIcon,
    Bell,
    Lock,
    Users,
    CreditCard,
    Globe,
    Mail,
    Shield,
    Check,
    Save
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { useStore } from '@/lib/store';

const TABS = [
    { id: 'profile', title: 'Profile', icon: Users },
    { id: 'workspace', title: 'Workspace', icon: Globe },
    { id: 'notifications', title: 'Notifications', icon: Bell },
    { id: 'security', title: 'Security', icon: Lock },
    { id: 'billing', title: 'Billing', icon: CreditCard },
];

export default function SettingsPage() {
    const { currentUser, updateUser, updateWorkspace, createCheckoutSession, workspaces, currentWorkspaceId, isLoading: isStoreLoading } = useStore();
    const [activeTab, setActiveTab] = useState('profile');
    const [isLoading, setIsLoading] = useState(false);
    const [isUpgrading, setIsUpgrading] = useState(false);
    const [mounted, setMounted] = useState(false);

    const currentWorkspace = workspaces.find(w => w.id === currentWorkspaceId);

    // Local state for form fields
    const [name, setName] = useState(currentUser?.name || '');
    const [wsName, setWsName] = useState(currentWorkspace?.name || '');

    // Sync local state when user loads
    React.useEffect(() => {
        setMounted(true);
        if (currentUser) {
            setName(currentUser.name);
        }
        if (currentWorkspace) {
            setWsName(currentWorkspace.name);
        }
    }, [currentUser, currentWorkspace]);

    if (!mounted) return null;

    const handleSaveProfile = async () => {
        setIsLoading(true);
        try {
            await updateUser({ name });
            toast.success('Profile Updated', {
                description: 'Your changes have been saved successfully.',
            });
        } catch (err) {
            toast.error('Update Failed', {
                description: 'Could not save changes. Please try again.',
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleSaveWorkspace = async () => {
        if (!currentWorkspaceId) return;
        setIsLoading(true);
        try {
            await updateWorkspace(currentWorkspaceId, wsName);
            toast.success('Workspace Updated', {
                description: 'Workspace settings have been saved.',
            });
        } catch (err) {
            toast.error('Update Failed', {
                description: 'Could not save workspace settings.',
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpgrade = async () => {
        setIsUpgrading(true);
        try {
            await createCheckoutSession('PRO');
        } catch (err) {
            toast.error('Upgrade Failed', {
                description: 'Could not initiate checkout. Please try again.',
            });
            setIsUpgrading(false);
        }
    };

    return (
        <div className="space-y-8 max-w-[1600px] mx-auto pb-20">
            <div className="flex flex-col gap-1">
                <h2 className="text-4xl font-black tracking-tight text-white">Settings</h2>
                <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">Manage your personal account and shared workspace.</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Navigation Sidebar */}
                <aside className="lg:w-64 shrink-0">
                    <nav className="flex lg:flex-col gap-1 overflow-x-auto no-scrollbar pb-2 lg:pb-0">
                        {TABS.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={cn(
                                    "flex items-center gap-4 px-6 py-4 rounded-[1.25rem] text-sm font-black transition-all whitespace-nowrap uppercase tracking-widest",
                                    activeTab === tab.id
                                        ? "bg-primary text-white shadow-glow scale-105"
                                        : "text-gray-500 hover:bg-white/5 hover:text-white"
                                )}
                            >
                                <tab.icon size={18} />
                                {tab.title}
                            </button>
                        ))}
                    </nav>
                </aside>

                {/* Content Area */}
                <main className="flex-1 min-w-0">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.2 }}
                        >
                            {activeTab === 'profile' && (
                                <Card className="rounded-[2.5rem] border border-white/5 shadow-premium overflow-hidden bg-white/5">
                                    <CardHeader className="border-b border-white/5 p-10">
                                        <CardTitle className="text-2xl font-black text-white">Public Profile</CardTitle>
                                        <p className="text-sm text-gray-500 font-bold uppercase tracking-widest">Visible to your team members</p>
                                    </CardHeader>
                                    <CardContent className="p-8 space-y-8">
                                        <div className="flex items-center gap-8">
                                            <div className="w-24 h-24 rounded-[2rem] bg-primary/10 flex items-center justify-center text-primary font-black text-3xl border-4 border-white/5 shadow-glow">
                                                {currentUser?.name?.substring(0, 2).toUpperCase() || 'ME'}
                                            </div>
                                            <div className="space-y-3">
                                                <Button variant="outline" size="sm" className="rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10">Change Avatar</Button>
                                                <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em]">JPG, GIF or PNG. Max size 1MB.</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <Input
                                                label="Full Name"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                            />
                                            <Input label="Email Address" value={currentUser?.email || ''} disabled />
                                        </div>
                                        <Textarea
                                            label="Biography"
                                            placeholder="Tell your team about your decision-making style..."
                                            disabled
                                            className="opacity-50"
                                            helperText="Biography is coming soon."
                                        />
                                    </CardContent>
                                    <CardFooter className="bg-white/5 p-10 flex justify-end border-t border-white/5">
                                        <Button onClick={handleSaveProfile} isLoading={isLoading} className="rounded-full px-10 h-14 shadow-glow gap-3 font-black uppercase tracking-widest text-xs">
                                            <Save size={20} />
                                            Update Profile
                                        </Button>
                                    </CardFooter>
                                </Card>
                            )}

                            {activeTab === 'workspace' && (
                                <Card className="rounded-[2.5rem] border border-white/5 shadow-premium overflow-hidden bg-white/5">
                                    <CardHeader className="border-b border-white/5 p-10">
                                        <CardTitle className="text-2xl font-black text-white uppercase tracking-tighter">Workspace Configuration</CardTitle>
                                        <p className="text-sm text-gray-500 font-bold uppercase tracking-widest">Customize how your team interacts with decisions.</p>
                                    </CardHeader>
                                    <CardContent className="p-8 space-y-8">
                                        <Input
                                            label="Workspace Name"
                                            value={wsName}
                                            onChange={(e) => setWsName(e.target.value)}
                                        />

                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Team Members</label>
                                            <div className="space-y-3">
                                                {currentWorkspace?.members?.length ? currentWorkspace.members.map((member, i) => (
                                                    <div key={i} className="flex items-center justify-between p-6 bg-white/5 rounded-3xl border border-white/5 hover:border-white/10 transition-colors">
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-xs font-black text-gray-400 border border-white/10 group-hover:scale-110 transition-transform">
                                                                {member.name.split(' ').map(n => n[0]).join('')}
                                                            </div>
                                                            <div>
                                                                <p className="text-base font-black text-white">{member.name}</p>
                                                                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">{member.email}</p>
                                                            </div>
                                                        </div>
                                                        <Badge variant="outline" className="bg-white/5 border-white/10 text-blue-400 text-[10px] font-black tracking-[0.2em] uppercase h-8 px-4">{member.role}</Badge>
                                                    </div>
                                                )) : (
                                                    <p className="text-sm text-gray-500 italic p-6">No other team members yet.</p>
                                                )}
                                            </div>
                                            <Button variant="outline" size="sm" className="w-full h-14 rounded-2xl gap-3 text-primary border-primary/20 hover:bg-primary/5 font-black uppercase tracking-widest text-xs mt-4">
                                                <Users size={16} />
                                                Invite Team Member
                                            </Button>
                                        </div>
                                    </CardContent>
                                    <CardFooter className="bg-white/5 p-10 flex justify-end border-t border-white/5">
                                        <Button onClick={handleSaveWorkspace} isLoading={isLoading} className="rounded-full px-10 h-14 shadow-glow gap-3 font-black uppercase tracking-widest text-xs">
                                            <Save size={20} />
                                            Update Workspace
                                        </Button>
                                    </CardFooter>
                                </Card>
                            )}

                            {activeTab === 'notifications' && (
                                <Card className="rounded-[2.5rem] border border-white/5 shadow-premium overflow-hidden bg-white/5">
                                    <CardHeader className="border-b border-white/5 p-10">
                                        <CardTitle className="text-2xl font-black text-white uppercase tracking-tighter">Communication Matrix</CardTitle>
                                        <p className="text-sm text-gray-500 font-bold uppercase tracking-widest">Choose when you want to be alerted about new insights.</p>
                                    </CardHeader>
                                    <CardContent className="p-8 space-y-6">
                                        {[
                                            { title: 'AI Insight Alerts', desc: 'Get notified when the AI detects a new blindspot in your decisions.', defaultOn: true },
                                            { title: 'Decision Reviews', desc: 'Daily reminder to review decisions due for outcome analysis.', defaultOn: true },
                                            { title: 'Team Activity', desc: 'Alert when a team member launches a new high-stakes decision.', defaultOn: false },
                                            { title: 'Weekly Summary', desc: 'Get a digest of your decision-making accuracy patterns.', defaultOn: true },
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-center justify-between py-6 border-b border-white/5 last:border-none">
                                                <div className="space-y-2 pr-4">
                                                    <p className="text-base font-black text-white">{item.title}</p>
                                                    <p className="text-sm text-gray-500 font-bold leading-relaxed max-w-sm">{item.desc}</p>
                                                </div>
                                                <div className={cn(
                                                    "w-14 h-8 rounded-full p-1 cursor-pointer transition-all border border-white/10",
                                                    item.defaultOn ? "bg-primary shadow-glow" : "bg-white/5"
                                                )}>
                                                    <div className={cn(
                                                        "w-6 h-6 bg-white rounded-full transition-transform shadow-md",
                                                        item.defaultOn && "translate-x-6"
                                                    )} />
                                                </div>
                                            </div>
                                        ))}
                                    </CardContent>
                                </Card>
                            )}

                            {activeTab === 'security' && (
                                <Card className="rounded-[2.5rem] border border-white/5 shadow-premium overflow-hidden bg-white/5">
                                    <CardHeader className="border-b border-white/5 p-10">
                                        <CardTitle className="text-2xl font-black text-white uppercase tracking-tighter">Account Security</CardTitle>
                                        <p className="text-sm text-gray-500 font-bold uppercase tracking-widest">Protection for your strategic data.</p>
                                    </CardHeader>
                                    <CardContent className="p-8 space-y-8">
                                        <div className="space-y-4">
                                            <Input label="New Password" type="password" placeholder="••••••••" />
                                            <Input label="Confirm New Password" type="password" placeholder="••••••••" />
                                            <Button size="sm" className="rounded-xl">Change Password</Button>
                                        </div>
                                        <div className="pt-10 border-t border-white/5 flex items-center justify-between">
                                            <div className="flex items-center gap-6">
                                                <div className="w-16 h-16 rounded-3xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shadow-glow shadow-indigo-500/10">
                                                    <Shield size={32} />
                                                </div>
                                                <div>
                                                    <p className="text-base font-black text-white">Two-Factor Authentication</p>
                                                    <p className="text-sm text-gray-500 font-bold">Currently disabled for your account.</p>
                                                </div>
                                            </div>
                                            <Button variant="outline" size="sm" className="rounded-xl h-12 px-8 border-white/10 bg-white/5 text-white hover:bg-primary hover:border-primary transition-all font-black uppercase tracking-widest text-xs">Enable 2FA</Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            )}

                            {activeTab === 'billing' && (
                                <Card className="rounded-[2.5rem] border border-white/5 shadow-premium overflow-hidden bg-white/5">
                                    <CardHeader className="border-b border-white/5 p-10">
                                        <CardTitle className="text-2xl font-black text-white uppercase tracking-tighter">Subscription & usage</CardTitle>
                                        <p className="text-sm text-gray-500 font-bold uppercase tracking-widest">Current active plan for {currentWorkspace?.name || 'Workspace'}.</p>
                                    </CardHeader>
                                    <CardContent className="p-8 space-y-8">
                                        <div className="p-10 bg-gradient-to-br from-gray-900 to-black rounded-[2.5rem] text-white relative overflow-hidden shadow-2xl border border-white/10">
                                            <div className="absolute top-0 right-0 p-10 opacity-5 grayscale group-hover:grayscale-0 transition-all duration-1000">
                                                <CreditCard size={180} />
                                            </div>
                                            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-10">
                                                <div className="space-y-4">
                                                    <Badge className="bg-blue-500 text-white border-none text-[10px] font-black tracking-[0.2em] uppercase px-4 h-8 flex items-center w-fit shadow-glow">CURRENT PLAN</Badge>
                                                    <h3 className="text-5xl font-black tracking-tighter italic">{currentWorkspace?.planTier || 'Free'} Tier</h3>
                                                    <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">
                                                        {currentWorkspace?.planTier === 'PRO' ? 'Unlimited team members • Unlimited choices.' : 'Up to 3 team members • 50 choices / mo.'}
                                                    </p>
                                                </div>
                                                <Button
                                                    onClick={handleUpgrade}
                                                    isLoading={isUpgrading}
                                                    disabled={isUpgrading}
                                                    className="bg-white text-black hover:bg-gray-200 px-10 h-16 rounded-[1.25rem] font-black text-xs uppercase tracking-widest shadow-xl shadow-white/5 transition-transform hover:scale-105 active:scale-95"
                                                >
                                                    Upgrade to Pro
                                                </Button>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Recent Invoices</h4>
                                            <p className="text-sm text-gray-500 italic">No invoices found for the current billing period.</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </main>
            </div>
        </div>
    );
}
