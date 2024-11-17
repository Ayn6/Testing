using Calculator;

namespace TestsCalculator
{
    [TestClass]
    public class CalculatorTests
    {
        private Calc calculator;

        [TestInitialize]
        public void Setup()
        {
            calculator = new Calc();
        }

        [TestMethod]
        public void AdditionTest()
        {
            double result = calculator.Addition(5.5, 3.2);
            Assert.AreEqual(8.7, result, 0.0001);
        }

        [TestMethod]
        public void SubtractTest()
        {
            double result = calculator.Subtract(10.5, 4.3);
            Assert.AreEqual(6.2, result, 0.0001);
        }

        [TestMethod]
        public void MultiplyTest()
        {
            double result = calculator.Multiply(7.5, 6.2);
            Assert.AreEqual(46.5, result, 0.0001);
        }

        [TestMethod]
        public void DivideTest()
        {
            double result = calculator.Divide(10.0, 2.0);
            Assert.AreEqual(5.0, result, 0.0001);
        }

        [TestMethod]
        [ExpectedException(typeof(DivideByZeroException))]
        public void DivideByZeroTest()
        {
            calculator.Divide(10.0, 0.0);
        }

        [TestMethod]
        [ExpectedException(typeof(ArgumentNullException))]
        public void AdditionWithNullValuesTest()
        {
            calculator.Addition(null, 5.5);
        }

        [TestMethod]
        [ExpectedException(typeof(ArgumentNullException))]
        public void SubtractWithNullValuesTest()
        {
            calculator.Subtract(10.0, null);
        }

        [TestMethod]
        [ExpectedException(typeof(ArgumentNullException))]
        public void MultiplyWithNullValuesTest()
        {
            calculator.Multiply(null, null);
        }

        [TestMethod]
        [ExpectedException(typeof(ArgumentNullException))]
        public void DivideWithNullValuesTest()
        {
            calculator.Divide(null, 2.0);
        }
    }
}