const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const asDate = (value) => {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

const safeArray = (value) => (Array.isArray(value) ? value : []);

const percentage = (value, total) => {
  if (!total) return 0;
  return Math.round((value / total) * 100);
};

const trendFromDates = (items, getDate, months = 6) => {
  const now = new Date();
  const buckets = [];

  for (let i = months - 1; i >= 0; i -= 1) {
    const ref = new Date(now.getFullYear(), now.getMonth() - i, 1);
    buckets.push({
      year: ref.getFullYear(),
      month: ref.getMonth(),
      label: `${MONTH_LABELS[ref.getMonth()]} ${String(ref.getFullYear()).slice(-2)}`,
      value: 0,
    });
  }

  items.forEach((item) => {
    const date = asDate(getDate(item));
    if (!date) return;

    const bucket = buckets.find(
      (entry) => entry.year === date.getFullYear() && entry.month === date.getMonth()
    );
    if (bucket) {
      bucket.value += 1;
    }
  });

  return buckets.map(({ label, value }) => ({ label, value }));
};

const topLocations = (applications, max = 5) => {
  const map = safeArray(applications).reduce((acc, app) => {
    const key = (app?.location || 'Unknown').trim();
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(map)
    .sort((a, b) => b[1] - a[1])
    .slice(0, max)
    .map(([label, value]) => ({ label, value }));
};

const getRecentApplications = (applications, limit = 6) =>
  [...safeArray(applications)]
    .sort((a, b) => {
      const bTime = asDate(b?.createdAt)?.getTime() || 0;
      const aTime = asDate(a?.createdAt)?.getTime() || 0;
      return bTime - aTime;
    })
    .slice(0, limit);

export const buildAdminAnalytics = (users, applications) => {
  const usersList = safeArray(users);
  const applicationsList = safeArray(applications);

  const customers = usersList.filter((user) => user?.role === 'CUSTOMER').length;
  const dealers = usersList.filter((user) => user?.role === 'DEALER').length;
  const totalUsers = usersList.length;
  const pendingApplications = applicationsList.length;

  const applicationTrend = trendFromDates(applicationsList, (item) => item?.createdAt, 6);
  const userTrend = trendFromDates(usersList, (item) => item?.createdAt, 6);

  const lastMonthApplications = applicationTrend.at(-1)?.value || 0;
  const previousMonthApplications = applicationTrend.at(-2)?.value || 0;
  const bookingVelocity =
    previousMonthApplications === 0
      ? (lastMonthApplications > 0 ? 100 : 0)
      : Math.round(
          ((lastMonthApplications - previousMonthApplications) / previousMonthApplications) * 100
        );

  return {
    summary: {
      totalUsers,
      customers,
      dealers,
      pendingApplications,
      dealerMix: percentage(dealers, totalUsers),
      customerMix: percentage(customers, totalUsers),
      applicationsPerDealer: Number((pendingApplications / Math.max(dealers, 1)).toFixed(2)),
      bookingVelocity,
    },
    trends: {
      applications: applicationTrend,
      users: userTrend,
    },
    distribution: {
      userMix: [
        { label: 'Customers', value: customers },
        { label: 'Dealers', value: dealers },
      ],
      locations: topLocations(applicationsList),
    },
    recentApplications: getRecentApplications(applicationsList),
  };
};
