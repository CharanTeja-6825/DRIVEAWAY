import { describe, expect, it, beforeEach, afterEach, vi } from 'vitest';
import { buildAdminAnalytics } from './analytics';

describe('buildAdminAnalytics', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-03-15T00:00:00.000Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('builds summary and distribution from users/applications', () => {
    const users = [
      { id: 'u1', role: 'CUSTOMER', createdAt: '2026-03-01T00:00:00.000Z' },
      { id: 'u2', role: 'CUSTOMER', createdAt: '2026-03-02T00:00:00.000Z' },
      { id: 'u3', role: 'DEALER', createdAt: '2026-02-11T00:00:00.000Z' },
    ];
    const applications = [
      { id: 'a1', location: 'Hyderabad', createdAt: '2026-03-03T00:00:00.000Z' },
      { id: 'a2', location: 'Hyderabad', createdAt: '2026-03-08T00:00:00.000Z' },
      { id: 'a3', location: 'Chennai', createdAt: '2026-02-21T00:00:00.000Z' },
    ];

    const analytics = buildAdminAnalytics(users, applications);

    expect(analytics.summary.totalUsers).toBe(3);
    expect(analytics.summary.customers).toBe(2);
    expect(analytics.summary.dealers).toBe(1);
    expect(analytics.summary.pendingApplications).toBe(3);
    expect(analytics.summary.customerMix).toBe(67);
    expect(analytics.summary.dealerMix).toBe(33);
    expect(analytics.distribution.locations[0]).toEqual({ label: 'Hyderabad', value: 2 });
    expect(analytics.trends.applications).toHaveLength(6);
    expect(analytics.recentApplications[0].id).toBe('a2');
  });

  it('handles empty or invalid data safely', () => {
    const analytics = buildAdminAnalytics(undefined, null);

    expect(analytics.summary.totalUsers).toBe(0);
    expect(analytics.summary.pendingApplications).toBe(0);
    expect(analytics.summary.applicationsPerDealer).toBe(0);
    expect(analytics.distribution.locations).toEqual([]);
    expect(analytics.trends.users.every((item) => item.value === 0)).toBe(true);
  });
});
