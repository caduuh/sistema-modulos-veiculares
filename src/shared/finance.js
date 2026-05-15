function calculateServiceTotal(service) {
  return (Number(service.km) * Number(service.kmValue)) + Number(service.installValue) + Number(service.toll);
}

function calculateServiceProfit(service) {
  return calculateServiceTotal(service) - Number(service.providerPaid);
}

function summarizeServices(services) {
  return services.reduce((acc, service) => {
    acc.revenue += calculateServiceTotal(service);
    acc.providerCost += Number(service.providerPaid);
    acc.profit += calculateServiceProfit(service);
    return acc;
  }, { revenue: 0, providerCost: 0, profit: 0 });
}

module.exports = {
  calculateServiceTotal,
  calculateServiceProfit,
  summarizeServices
};
