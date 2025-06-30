
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calculator, TrendingUp } from "lucide-react";

const ROICalculator = () => {
  const [employees, setEmployees] = useState(10);
  const [hoursSaved, setHoursSaved] = useState(8);
  const [avgSalary, setAvgSalary] = useState(50000);

  const calculateROI = () => {
    const hourlyRate = avgSalary / (52 * 40); // Annual salary to hourly
    const weeklySavings = employees * hoursSaved * hourlyRate;
    const monthlySavings = weeklySavings * 4.33;
    const annualSavings = monthlySavings * 12;
    const infinicsInvestment = 15000; // Base price
    const roi = ((annualSavings - infinicsInvestment) / infinicsInvestment) * 100;
    const paybackMonths = infinicsInvestment / monthlySavings;

    return {
      monthlySavings: Math.round(monthlySavings),
      annualSavings: Math.round(annualSavings),
      roi: Math.round(roi),
      paybackMonths: Math.round(paybackMonths * 10) / 10
    };
  };

  const results = calculateROI();

  return (
    <section className="py-20 bg-gradient-to-br from-cyan-50 to-green-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Calculate Your ROI
          </h2>
          <p className="text-xl text-gray-600">
            See exactly how much you'll save with AI automation
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Calculator Inputs */}
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Calculator className="mr-2 h-5 w-5 text-cyan-600" />
                  Your Business Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of employees affected
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={employees}
                    onChange={(e) => setEmployees(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="text-center text-lg font-semibold text-cyan-600 mt-2">
                    {employees} employees
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hours saved per employee per week
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    value={hoursSaved}
                    onChange={(e) => setHoursSaved(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="text-center text-lg font-semibold text-cyan-600 mt-2">
                    {hoursSaved} hours/week
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Average employee salary ($)
                  </label>
                  <input
                    type="range"
                    min="30000"
                    max="120000"
                    step="5000"
                    value={avgSalary}
                    onChange={(e) => setAvgSalary(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="text-center text-lg font-semibold text-cyan-600 mt-2">
                    ${avgSalary.toLocaleString()}/year
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Results */}
            <Card className="shadow-xl bg-gradient-to-br from-white to-gray-50">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <TrendingUp className="mr-2 h-5 w-5 text-green-600" />
                  Your ROI Results
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {results.roi}% ROI
                  </div>
                  <div className="text-gray-600">Return on Investment (Annual)</div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-cyan-50 rounded-lg">
                    <div className="text-2xl font-bold text-cyan-600">
                      ${results.monthlySavings.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Monthly Savings</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      ${results.annualSavings.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Annual Savings</div>
                  </div>
                </div>

                <div className="text-center p-4 bg-gradient-to-r from-cyan-50 to-green-50 rounded-lg">
                  <div className="text-xl font-bold text-gray-800">
                    Payback in {results.paybackMonths} months
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    Investment: $15,000 (one-time)
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-white">
                  Start Your Project Today
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ROICalculator;
