using NUnit.Framework;
using app.Models;

namespace app.Tests.Models;

[TestFixture]
public class PagerTests
{
    [Test]
    public void Pager_DefaultConstructor_InitializesProperties()
    {
        // Arrange & Act
        var pager = new Pager();

        // Assert
        Assert.AreEqual(0, pager.TotalItems);
        Assert.AreEqual(0, pager.CurrentPage);
        Assert.AreEqual(0, pager.PageSize);
    }

    [Test]
    public void Pager_SetProperties_StoresValuesCorrectly()
    {
        // Arrange
        var pager = new Pager();

        // Act
        pager.TotalItems = 100;
        pager.CurrentPage = 5;
        pager.PageSize = 10;

        // Assert
        Assert.AreEqual(100, pager.TotalItems);
        Assert.AreEqual(5, pager.CurrentPage);
        Assert.AreEqual(10, pager.PageSize);
    }

    [Test]
    [TestCase(0, 1, 10)]
    [TestCase(50, 2, 10)]
    [TestCase(100, 10, 10)]
    [TestCase(25, 3, 5)]
    public void Pager_WithVariousPaginationValues_MaintainsIntegrity(
        int totalItems, int currentPage, int pageSize)
    {
        // Arrange & Act
        var pager = new Pager
        {
            TotalItems = totalItems,
            CurrentPage = currentPage,
            PageSize = pageSize
        };

        // Assert
        Assert.AreEqual(totalItems, pager.TotalItems);
        Assert.AreEqual(currentPage, pager.CurrentPage);
        Assert.AreEqual(pageSize, pager.PageSize);
    }

    [Test]
    public void Pager_WithLargeDataSet_CalculatesCorrectly()
    {
        // Arrange & Act
        var pager = new Pager
        {
            TotalItems = 1000,
            CurrentPage = 1,
            PageSize = 50
        };

        // Assert
        Assert.AreEqual(1000, pager.TotalItems);
        Assert.Greater(1000, pager.PageSize);
    }
}

