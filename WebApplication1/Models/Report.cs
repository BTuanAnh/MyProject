using System;
using System.Collections.Generic;

namespace WebApplication1.Models;

public partial class Report
{
    public int ReportId { get; set; }

    public DateOnly ReportDate { get; set; }

    public decimal TotalRevenue { get; set; }

    public int TotalOrders { get; set; }

    public int? BestSellingProductId { get; set; }

    public virtual Product? BestSellingProduct { get; set; }
}
