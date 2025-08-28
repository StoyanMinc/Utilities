//* return date with dd.mm.yyyy format from iso string
function returnFormattedDate(dt) {
    // if (!dt) { return 'Няма въведена дата' }
    let split_date = dt.split("T");
    let date_reorder = split_date[0].split("-");
    return date_reorder[2] + "." + date_reorder[1] + "." + date_reorder[0];
}

//* get iso string of days ago
function getISOStringDaysAgo(days: number): string {
    const now = new Date();
    const resultDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
    return resultDate.toISOString();
}

//* get names of last six months
function getLastSixMonths() {
    const today = new Date();
    const months: string[] = [];
    const stats: Record<string, { allOrders: number, completedOrders: number }> = {};

    for (let i = 5; i >= 0; i--) {
        const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
        const monthName = d.toLocaleString('default', { month: 'short' });
        months.push(monthName);

        stats[monthName] = { allOrders: 0, completedOrders: 0 };
    }

    const firstDateObj = new Date(today.getFullYear(), today.getMonth() - 5, 1);
    firstDateObj.setHours(0, 0, 0, 0);

    return {
        months,
        firstDate: firstDateObj.toISOString(),
        stats
    };
}

//* group items by month depend of iso string
function groupOrdersByMonth(orders) {
    const grouped: Record<string, any[]> = {};

    orders.forEach(item => {
        const date = new Date(item.date_added);
        const monthName = date.toLocaleString('default', { month: 'short' }); // "Aug", "Sep", etc.

        if (!grouped[monthName]) {
            grouped[monthName] = [];
        }
        grouped[monthName].push(item);
    });

    return grouped;
}