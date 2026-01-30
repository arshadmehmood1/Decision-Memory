'use client';

import { useState, useEffect } from 'react';
import { useStore } from '@/lib/store';
import { apiRequest } from '@/lib/api-client';
import {
    Users,
    CreditCard,
    Clock,
    TrendingUp,
    LayoutDashboard,
    Search,
    ChevronRight,
    ArrowUpRight,
    ArrowDownRight,
    Activity,
    X,
    ChevronLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface AdminStats {
    userCount: number;
    paidUserCount: number;
    avgEngagementTime: number;
    recentActivity: any[];
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<AdminStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [showLogsModal, setShowLogsModal] = useState(false);
    const [fullLogs, setFullLogs] = useState<any[]>([]);
    const [logsPagination, setLogsPagination] = useState({ page: 1, pages: 1, total: 0 });
    const [logsLoading, setLogsLoading] = useState(false);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await apiRequest<{ data: AdminStats }>('/admin/stats');
                setStats(res.data);
            } catch (err) {
                console.error("Failed to fetch admin stats", err);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const fetchFullLogs = async (page = 1) => {
        setLogsLoading(true);
        try {
            const res = await apiRequest<{ data: any[]; pagination: any }>(`/admin/activity?page=${page}&limit=20`);
            setFullLogs(res.data);
            setLogsPagination(res.pagination);
        } catch (err) {
            console.error("Failed to fetch logs", err);
        } finally {
            setLogsLoading(false);
        }
    };

    const handleOpenLogs = () => {
        setShowLogsModal(true);
        fetchFullLogs(1);
    };

    if (loading) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
        </div>
    );

    const kpis = [
        {
            label: 'Total Neural Nodes',
            value: stats?.userCount || 0,
            icon: Users,
            color: 'text-blue-400',
            bg: 'bg-blue-400/10',
            trend: '+12%',
            trendUp: true
        },
        {
            label: 'Licensed Operatives',
            value: stats?.paidUserCount || 0,
            icon: CreditCard,
            color: 'text-amber-400',
            bg: 'bg-amber-400/10',
            trend: '+5%',
            trendUp: true
        },
        {
            label: 'Avg. Neural Sync',
            value: `${stats?.avgEngagementTime || 0}s`,
            icon: Clock,
            color: 'text-emerald-400',
            bg: 'bg-emerald-400/10',
            trend: '-2%',
            trendUp: false
        },
        {
            label: 'Conversion Matrix',
            value: stats?.userCount ? `${Math.round((stats.paidUserCount / stats.userCount) * 100)}%` : '0%',
            icon: TrendingUp,
            color: 'text-purple-400',
            bg: 'bg-purple-400/10',
            trend: '+0.5%',
            trendUp: true
        }
    ];

    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-black text-white uppercase tracking-tighter mb-2">Command Center</h1>
                <p className="text-gray-500 text-sm font-medium tracking-wide">Strategic overview of the Decision Matrix</p>
            </header>

            {/* KPI Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {kpis.map((kpi, i) => (
                    <motion.div
                        key={kpi.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <Card className="p-6 bg-[#0d1117] border-white/5 hover:border-white/10 transition-all group">
                            <div className="flex justify-between items-start mb-4">
                                <div className={`w-12 h-12 rounded-2xl ${kpi.bg} flex items-center justify-center`}>
                                    <kpi.icon className={kpi.color} size={24} />
                                </div>
                                <div className={cn(
                                    "flex items-center gap-1 text-[10px] font-black uppercase tracking-widest",
                                    kpi.trendUp ? "text-emerald-400" : "text-red-400"
                                )}>
                                    {kpi.trendUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                                    {kpi.trend}
                                </div>
                            </div>
                            <div>
                                <h3 className="text-2xl font-black text-white mb-1">{kpi.value}</h3>
                                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{kpi.label}</p>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* Charts & Activity Placeholder */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2 p-6 bg-[#0d1117] border-white/5">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-sm font-black text-white uppercase tracking-widest">Growth Telemetry</h3>
                            <p className="text-[10px] font-medium text-gray-500 tracking-wide mt-1">User acquisition vs. retention</p>
                        </div>
                        <Badge className="bg-primary/10 text-primary border-primary/20">Real-time</Badge>
                    </div>

                    <div className="h-[300px] flex items-end justify-between gap-2 px-4">
                        {[40, 60, 45, 70, 90, 65, 80, 50, 60, 75, 85, 95].map((h, i) => (
                            <motion.div
                                key={i}
                                initial={{ height: 0 }}
                                animate={{ height: `${h}%` }}
                                transition={{ delay: 0.5 + i * 0.05 }}
                                className="w-full bg-gradient-to-t from-primary/20 to-primary/60 rounded-t-lg group relative"
                            >
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                    {h}%
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    <div className="flex justify-between mt-4 px-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">
                        <span>Jan</span>
                        <span>Jun</span>
                        <span>Dec</span>
                    </div>
                </Card>

                <Card className="p-6 bg-[#0d1117] border-white/5">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-sm font-black text-white uppercase tracking-widest">Recent Neutral Syncs</h3>
                        <Activity className="text-gray-500" size={16} />
                    </div>

                    <div className="space-y-6">
                        {stats?.recentActivity?.map((activity, i) => (
                            <div key={activity.id} className="flex gap-4 group">
                                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[10px] font-bold text-gray-400 shrink-0">
                                    {activity.user?.name?.[0].toUpperCase() || 'U'}
                                </div>
                                <div className="min-w-0">
                                    <p className="text-xs font-bold text-white truncate">{activity.user?.name || activity.user?.email}</p>
                                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-tighter mt-1">
                                        {activity.type.replace('_', ' ')} • {new Date(activity.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </p>
                                </div>
                                <ChevronRight className="ml-auto text-gray-700 group-hover:text-primary transition-colors shrink-0" size={14} />
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={handleOpenLogs}
                        className="w-full mt-8 py-3 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black text-white uppercase tracking-widest hover:bg-white/10 transition-all"
                    >
                        View Full Logs
                    </button>
                </Card>
            </div>

            {/* Full Logs Modal */}
            <AnimatePresence>
                {showLogsModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowLogsModal(false)}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-8"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-[#0d1117] border border-white/10 rounded-3xl w-full max-w-3xl max-h-[80vh] overflow-hidden"
                        >
                            <div className="p-8 border-b border-white/5 flex items-center justify-between">
                                <div>
                                    <h2 className="text-xl font-black text-white uppercase tracking-tighter">Full Activity Logs</h2>
                                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">{logsPagination.total} total entries</p>
                                </div>
                                <button onClick={() => setShowLogsModal(false)} className="p-2 rounded-xl bg-white/5 text-gray-500 hover:text-white hover:bg-white/10 transition-all">
                                    <X size={18} />
                                </button>
                            </div>
                            <div className="p-8 overflow-y-auto max-h-[50vh]">
                                {logsLoading ? (
                                    <div className="flex items-center justify-center py-20">
                                        <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
                                    </div>
                                ) : fullLogs.length === 0 ? (
                                    <div className="text-center py-20 text-gray-500">
                                        <Activity className="mx-auto mb-4 opacity-50" size={48} />
                                        <p className="text-sm">No activity logs found</p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {fullLogs.map((activity) => (
                                            <div key={activity.id} className="flex gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all">
                                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-xs font-bold text-gray-400 shrink-0">
                                                    {activity.user?.name?.[0]?.toUpperCase() || 'U'}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-bold text-white truncate">{activity.user?.name || activity.user?.email}</p>
                                                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-tighter mt-1">
                                                        {activity.type.replace('_', ' ')}
                                                    </p>
                                                </div>
                                                <div className="text-right shrink-0">
                                                    <p className="text-[10px] font-bold text-gray-400">
                                                        {new Date(activity.createdAt).toLocaleDateString()}
                                                    </p>
                                                    <p className="text-[10px] font-bold text-gray-500">
                                                        {new Date(activity.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            {logsPagination.pages > 1 && (
                                <div className="p-6 border-t border-white/5 flex items-center justify-between">
                                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                                        Page {logsPagination.page} of {logsPagination.pages}
                                    </p>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            disabled={logsPagination.page <= 1}
                                            onClick={() => fetchFullLogs(logsPagination.page - 1)}
                                            className="h-8 px-3 border-white/5 text-gray-500 hover:text-white"
                                        >
                                            <ChevronLeft size={14} />
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            disabled={logsPagination.page >= logsPagination.pages}
                                            onClick={() => fetchFullLogs(logsPagination.page + 1)}
                                            className="h-8 px-3 border-white/5 text-gray-500 hover:text-white"
                                        >
                                            <ChevronRight size={14} />
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

