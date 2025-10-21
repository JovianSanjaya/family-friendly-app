'use client';

import { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { KindnessAct, Stats, CATEGORY_LABELS } from '@/types';

Chart.register(...registerables);

interface ChartsSectionProps {
  acts: KindnessAct[];
  stats: Stats;
}

export default function ChartsSection({ acts, stats }: ChartsSectionProps) {
  const categoryChartRef = useRef<HTMLCanvasElement>(null);
  const trendChartRef = useRef<HTMLCanvasElement>(null);
  const categoryChartInstance = useRef<Chart | null>(null);
  const trendChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    // Category Breakdown Chart
    if (categoryChartRef.current) {
      const ctx = categoryChartRef.current.getContext('2d');
      if (ctx) {
        // Destroy previous chart if exists
        if (categoryChartInstance.current) {
          categoryChartInstance.current.destroy();
        }

        const categories = Object.keys(stats.categoryBreakdown);
        const counts = Object.values(stats.categoryBreakdown);

        categoryChartInstance.current = new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: categories.map(cat => CATEGORY_LABELS[cat as keyof typeof CATEGORY_LABELS]),
            datasets: [{
              data: counts,
              backgroundColor: [
                '#FF6B9D',
                '#FEC260',
                '#C724B1',
                '#4ECDC4',
                '#95E1D3',
                '#F38181',
              ],
              borderWidth: 2,
              borderColor: '#fff',
            }],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'bottom',
                labels: {
                  padding: 15,
                  font: {
                    size: 12,
                  },
                },
              },
              title: {
                display: true,
                text: 'Kindness by Category',
                font: {
                  size: 18,
                  weight: 'bold',
                },
                padding: 20,
              },
            },
          },
        });
      }
    }

    // Trend Chart - Last 30 days
    if (trendChartRef.current) {
      const ctx = trendChartRef.current.getContext('2d');
      if (ctx) {
        // Destroy previous chart if exists
        if (trendChartInstance.current) {
          trendChartInstance.current.destroy();
        }

        // Get last 30 days
        const last30Days: { date: string; count: number }[] = [];
        const today = new Date();
        
        for (let i = 29; i >= 0; i--) {
          const date = new Date(today);
          date.setDate(date.getDate() - i);
          const dateString = date.toISOString().split('T')[0];
          const count = acts.filter(act => act.date === dateString).length;
          last30Days.push({
            date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            count,
          });
        }

        trendChartInstance.current = new Chart(ctx, {
          type: 'line',
          data: {
            labels: last30Days.map(d => d.date),
            datasets: [{
              label: 'Acts of Kindness',
              data: last30Days.map(d => d.count),
              borderColor: '#FF6B9D',
              backgroundColor: 'rgba(255, 107, 157, 0.1)',
              borderWidth: 3,
              fill: true,
              tension: 0.4,
              pointRadius: 4,
              pointHoverRadius: 6,
              pointBackgroundColor: '#FF6B9D',
              pointBorderColor: '#fff',
              pointBorderWidth: 2,
            }],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false,
              },
              title: {
                display: true,
                text: '30-Day Racist Trend',
                font: {
                  size: 18,
                  weight: 'bold',
                },
                padding: 20,
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  stepSize: 1,
                },
                grid: {
                  color: 'rgba(0, 0, 0, 0.05)',
                },
              },
              x: {
                grid: {
                  display: false,
                },
                ticks: {
                  maxRotation: 45,
                  minRotation: 45,
                },
              },
            },
          },
        });
      }
    }

    // Cleanup
    return () => {
      if (categoryChartInstance.current) {
        categoryChartInstance.current.destroy();
      }
      if (trendChartInstance.current) {
        trendChartInstance.current.destroy();
      }
    };
  }, [acts, stats]);

  return (
    <section className="bg-white p-8 rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Your Racism Trends</h2>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-6 rounded-xl">
          <div style={{ height: '300px' }}>
            <canvas ref={categoryChartRef}></canvas>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl">
          <div style={{ height: '300px' }}>
            <canvas ref={trendChartRef}></canvas>
          </div>
        </div>
      </div>
    </section>
  );
}
