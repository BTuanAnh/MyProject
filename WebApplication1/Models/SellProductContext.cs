using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace WebApplication1.Models;

public partial class SellProductContext : DbContext
{
    public SellProductContext()
    {
    }

    public SellProductContext(DbContextOptions<SellProductContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Product> Products { get; set; }

    public virtual DbSet<Cart> Carts { get; set; }

    public virtual DbSet<Category> Categories { get; set; }

    public virtual DbSet<Feedback> Feedbacks { get; set; }

    public virtual DbSet<Order> Orders { get; set; }

    public virtual DbSet<OrderDetail> OrderDetails { get; set; }

    public virtual DbSet<Promotion> Promotions { get; set; }

    public virtual DbSet<Report> Reports { get; set; }

    public virtual DbSet<User> Users { get; set; }




    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Data Source=ADMIN\\SQLEXPRESS;Database=ElectronicWebDB;Trusted_Connection=True;TrustServerCertificate=True;");



    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Product>(entity =>
        {
            entity.HasKey(e => e.ProductId).HasName("PK__Products__3DE0C22743BEE21C");

            entity.Property(e => e.ProductId).HasColumnName("ProductID");
            entity.Property(e => e.Manufacturer).HasMaxLength(255);
            entity.Property(e => e.CategoryId).HasColumnName("CategoryID");
            entity.Property(e => e.ImageUrl)
                .HasMaxLength(500)
                .IsUnicode(false)
                .HasColumnName("ImageURL");
            entity.Property(e => e.Price).HasColumnType("decimal(10, 2)");
            entity.Property(e => e.Title).HasMaxLength(255);

            entity.HasOne(d => d.Category).WithMany(p => p.Products)
                .HasForeignKey(d => d.CategoryId)
                .HasConstraintName("FK__Products__CategoryI__36D11DD4");
        });

        modelBuilder.Entity<Cart>(entity =>
        {
            entity.HasKey(e => e.CartId).HasName("PK__Cart__51BCD7975E0480A7");

            entity.ToTable("Cart");

            entity.Property(e => e.CartId).HasColumnName("CartID");
            entity.Property(e => e.ProductId).HasColumnName("ProductID");
            entity.Property(e => e.UserId).HasColumnName("UserID");

            entity.HasOne(d => d.Product).WithMany(p => p.Carts)
                .HasForeignKey(d => d.ProductId)
                .HasConstraintName("FK__Cart__ProductID__536D5C82");

            entity.HasOne(d => d.User).WithMany(p => p.Carts)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK__Cart__UserID__52793849");
        });

        modelBuilder.Entity<Category>(entity =>
        {
            entity.HasKey(e => e.CategoryId).HasName("PK__Categori__19093A2BF3D73C33");

            entity.HasIndex(e => e.CategoryName, "UQ__Categori__8517B2E0B645B5B8").IsUnique();

            entity.Property(e => e.CategoryId).HasColumnName("CategoryID");
            entity.Property(e => e.CategoryName).HasMaxLength(100);
            entity.Property(e => e.ParentCategoryId).HasColumnName("ParentCategoryID");

            entity.HasOne(d => d.ParentCategory).WithMany(p => p.InverseParentCategory)
                .HasForeignKey(d => d.ParentCategoryId)
                .HasConstraintName("FK__Categorie__Paren__3118447E");
        });

        modelBuilder.Entity<Feedback>(entity =>
        {
            entity.HasKey(e => e.FeedbackId).HasName("PK__Feedback__6A4BEDF69B4E70FF");

            entity.ToTable("Feedback");

            entity.Property(e => e.FeedbackId).HasColumnName("FeedbackID");
            entity.Property(e => e.ProductId).HasColumnName("ProductID");
            entity.Property(e => e.FeedbackDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.UserId).HasColumnName("UserID");

            entity.HasOne(d => d.Product).WithMany(p => p.Feedbacks)
                .HasForeignKey(d => d.ProductId)
                .HasConstraintName("FK__Feedback__ProductID__3C89F72A");

            entity.HasOne(d => d.User).WithMany(p => p.Feedbacks)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK__Feedback__UserID__3B95D2F1");
        });

        modelBuilder.Entity<Order>(entity =>
        {
            entity.HasKey(e => e.OrderId).HasName("PK__Orders__C3905BAFDC82114A");

            entity.Property(e => e.OrderId).HasColumnName("OrderID");
            entity.Property(e => e.OrderDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.PaymentMethod).HasMaxLength(20);
            entity.Property(e => e.Status).HasMaxLength(20);
            entity.Property(e => e.TotalAmount).HasColumnType("decimal(10, 2)");
            entity.Property(e => e.UserId).HasColumnName("UserID");

            entity.HasOne(d => d.User).WithMany(p => p.Orders)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK__Orders__UserID__4242D080");

            entity.HasMany(d => d.Promotions).WithMany(p => p.Orders)
                .UsingEntity<Dictionary<string, object>>(
                    "AppliedPromotion",
                    r => r.HasOne<Promotion>().WithMany()
                        .HasForeignKey("PromotionId")
                        .HasConstraintName("FK__AppliedPr__Promo__4EA8A765"),
                    l => l.HasOne<Order>().WithMany()
                        .HasForeignKey("OrderId")
                        .HasConstraintName("FK__AppliedPr__Order__4DB4832C"),
                    j =>
                    {
                        j.HasKey("OrderId", "PromotionId").HasName("PK__AppliedP__26BC195D747442DF");
                        j.ToTable("AppliedPromotions");
                        j.IndexerProperty<int>("OrderId").HasColumnName("OrderID");
                        j.IndexerProperty<int>("PromotionId").HasColumnName("PromotionID");
                    });
        });

        modelBuilder.Entity<OrderDetail>(entity =>
        {
            entity.HasKey(e => e.OrderDetailId).HasName("PK__OrderDet__D3B9D30C737B4328");

            entity.Property(e => e.OrderDetailId).HasColumnName("OrderDetailID");
            entity.Property(e => e.ProductId).HasColumnName("ProductID");
            entity.Property(e => e.OrderId).HasColumnName("OrderID");
            entity.Property(e => e.UnitPrice).HasColumnType("decimal(10, 2)");

            entity.HasOne(d => d.Product).WithMany(p => p.OrderDetails)
                .HasForeignKey(d => d.ProductId)
                .HasConstraintName("FK__OrderDeta__ProductI__47FBA9D6");

            entity.HasOne(d => d.Order).WithMany(p => p.OrderDetails)
                .HasForeignKey(d => d.OrderId)
                .HasConstraintName("FK__OrderDeta__Order__4707859D");
        });

        modelBuilder.Entity<Promotion>(entity =>
        {
            entity.HasKey(e => e.PromotionId).HasName("PK__Promotio__52C42F2F677943F7");
            
            entity.Property(e => e.PromotionId).HasColumnName("PromotionID");
            entity.Property(e => e.DiscountPercentage).HasColumnType("decimal(5, 2)");
            entity.Property(e => e.PromotionName).HasMaxLength(255);
        });


        modelBuilder.Entity<Promotion>()
        .ToTable("Promotions", tb => tb.HasTrigger("trg_CheckEndDate"));

        
        modelBuilder.Entity<Report>(entity =>
        {
            entity.HasKey(e => e.ReportId).HasName("PK__Reports__D5BD48E5E3A71B2C");

            entity.Property(e => e.ReportId).HasColumnName("ReportID");
            entity.Property(e => e.BestSellingProductId).HasColumnName("BestSellingProductID");
            entity.Property(e => e.TotalRevenue).HasColumnType("decimal(15, 2)");

            entity.HasOne(d => d.BestSellingProduct).WithMany(p => p.Reports)
                .HasForeignKey(d => d.BestSellingProductId)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("FK__Reports__BestSel__5649C92D");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__Users__1788CCAC5DC42A42");

            entity.HasIndex(e => e.Username, "UQ__Users__536C85E43A7E20B0").IsUnique();

            entity.HasIndex(e => e.Email, "UQ__Users__A9D10534A953E5E2").IsUnique();

            entity.Property(e => e.UserId).HasColumnName("UserID");
            entity.Property(e => e.Address).HasMaxLength(255);
            entity.Property(e => e.Email)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Password).HasMaxLength(255);
            entity.Property(e => e.Phone)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.Role)
                .HasMaxLength(20)
                .HasDefaultValue("Customer");
            entity.Property(e => e.Username)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
