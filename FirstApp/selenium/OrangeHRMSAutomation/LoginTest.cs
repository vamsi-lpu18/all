using NUnit.Framework;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Support.UI;
using AventStack.ExtentReports;
using AventStack.ExtentReports.Reporter;

namespace OrangeHRMSAutomation
{
    public class LoginTest
    {
        IWebDriver? driver;
        ExtentReports? extent;
        ExtentTest? test;

        [OneTimeSetUp]
        public void SetupReporting()
        {
            var sparkReporter = new ExtentSparkReporter("TestReport.html");
            extent = new ExtentReports();
            extent.AttachReporter(sparkReporter);
        }

        [SetUp]
        public void StartBrowser()
        {
            driver = new ChromeDriver(); // ChromeDriver auto-resolved via NuGet
            driver.Manage().Window.Maximize();
            driver.Navigate().GoToUrl("https://opensource-demo.orangehrmlive.com/");
        }

        [Test]
        public void LoginToOrangeHRMS()
        {
            test = extent!.CreateTest("Login Test").Info("Test Started");

            try
            {
                var wait = new WebDriverWait(driver!, TimeSpan.FromSeconds(30));

                var usernameField = wait.Until(d => d.FindElement(By.Name("username")));
                usernameField.SendKeys("Admin");

                driver!.FindElement(By.Name("password")).SendKeys("admin123");
                driver.FindElement(By.CssSelector("button[type='submit']")).Click();

                wait.Until(d => d.Url.Contains("dashboard"));
                Assert.That(driver.Url, Does.Contain("dashboard"));
                test!.Pass("Login successful");
            }
            catch (Exception ex)
            {
                test.Fail("Test failed: " + ex.Message);
                throw;
            }
        }

        [TearDown]
        public void EndTest()
        {
            driver?.Dispose();
        }

        [OneTimeTearDown]
        public void GenerateReport()
        {
            extent?.Flush();
        }
    }
}
