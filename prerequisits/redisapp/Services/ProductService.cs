using Microsoft.EntityFrameworkCore;

public class ProductService
{
    private readonly AppDbContext _db;
    private readonly ICacheService _cache;

    public ProductService(AppDbContext db, ICacheService cache)
    {
        _db = db;
        _cache = cache;
    }

    // 🔹 GET BY ID
    public async Task<Product?> GetProduct(int id)
    {
        var cacheKey = CacheKeys.Product(id);

        // 1️⃣ Check Redis
        var cached = await _cache.GetAsync<Product>(cacheKey);
        if (cached != null)
        {
            Console.WriteLine($"[CACHE] Product {id} served from Redis cache.");
            return cached;
        }

        // 2️⃣ Fetch from DB
        var product = await _db.Products.FindAsync(id);

        if (product == null)
            return null;

        // 3️⃣ Store in cache
        await _cache.SetAsync(cacheKey, product, TimeSpan.FromMinutes(10));
        Console.WriteLine($"[DB] Product {id} served from database and cached.");

        return product;
    }

    // 🔹 GET ALL
    public async Task<List<Product>> GetAllProducts()
    {
        var cacheKey = CacheKeys.ProductList();

        var cached = await _cache.GetAsync<List<Product>>(cacheKey);
        if (cached != null)
        {
            Console.WriteLine("[CACHE] Product list served from Redis cache.");
            return cached;
        }

        var products = await _db.Products.ToListAsync();

        await _cache.SetAsync(cacheKey, products, TimeSpan.FromMinutes(5));
        Console.WriteLine("[DB] Product list served from database and cached.");

        return products;
    }

    // 🔹 CREATE
    public async Task<Product> CreateProduct(Product product)
    {
        _db.Products.Add(product);
        await _db.SaveChangesAsync();

        // ❗ Invalidate list cache
        await _cache.RemoveAsync(CacheKeys.ProductList());

        return product;
    }

    // 🔹 UPDATE
    public async Task<bool> UpdateProduct(int id, Product updated)
    {
        var product = await _db.Products.FindAsync(id);
        if (product == null)
            return false;

        product.Name = updated.Name;
        product.Price = updated.Price;

        await _db.SaveChangesAsync();

        // ❗ Invalidate caches
        await _cache.RemoveAsync(CacheKeys.Product(id));
        await _cache.RemoveAsync(CacheKeys.ProductList());

        return true;
    }

    // 🔹 DELETE
    public async Task<bool> DeleteProduct(int id)
    {
        var product = await _db.Products.FindAsync(id);
        if (product == null)
            return false;

        _db.Products.Remove(product);
        await _db.SaveChangesAsync();

        // ❗ Invalidate caches
        await _cache.RemoveAsync(CacheKeys.Product(id));
        await _cache.RemoveAsync(CacheKeys.ProductList());

        return true;
    }
}