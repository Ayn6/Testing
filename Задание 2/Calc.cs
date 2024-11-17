namespace Calculator
{
    public class Calc
    {
        public double Addition(double? a, double? b)
        {
            if (a == null || b == null)
                throw new ArgumentNullException("Input values cannot be null");
            return a.Value + b.Value;
        }

        public double Subtract(double? a, double? b)
        {
            if (a == null || b == null)
                throw new ArgumentNullException("Input values cannot be null");
            return a.Value - b.Value;
        }

        public double Multiply(double? a, double? b)
        {
            if (a == null || b == null)
                throw new ArgumentNullException("Input values cannot be null");
            return a.Value * b.Value;
        }

        public double Divide(double? a, double? b)
        {
            if (a == null || b == null)
                throw new ArgumentNullException("Input values cannot be null");
            if (b == 0)
                throw new DivideByZeroException("Cannot divide by zero");
            return a.Value / b.Value;
        }
    }
}
