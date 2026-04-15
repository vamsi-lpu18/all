public static class CacheKeys
{
    public static string Product(int id) => $"product:{id}";
    public static string ProductList() => "product:list";
}