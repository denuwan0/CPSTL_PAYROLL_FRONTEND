export default function getPaysheet() {
  const paysheetData = [
    {
      grossSalary: 1350000,
      totDeduction: 650000,
      totUnrecovered: 20000,
      epfCorp: 30000,
      totEpf: 45000,
      etf: 45000,
      empData: {
        epf: "117534",
        name: "Charith Denuwan Porage",
        function: "Information Systems",
        location: "Kolonnawa",
        designation: "Software Engineer",
        grade: "A7",
        costCenter: "C10110",
        date: "122023",
        role: "Admin",
      },
      earningData: {
        "010basicSalary": 83735,
        "012stagnationAllowance": 3480,
        "071attendanceIncentive": 500,
        "070mealAllowance": 3150,
        "080terminalAllowance": 1000,
        "126costOfLivingAllowance": 5250,
        "140travellingAllowance": 2450,
        "150laundryAllowance": 100,
        "170overtime": 50000,
        "320_": 7780,
        "860medicalScheme": 250,
      },
      deductionData: {
        "310epfDeduction": 9711,
        "320_": 7780,
        "328payeTax": 10921,
        "330medicalRecoveries": 3179,
        "331medicalRecoveries": 1953,
        "332medicalRecoveries": 5889,
        "340schoolBookAdvance": 2000,
        "405motorCycleLoan": 2000,
        "407housingLoan": 2000,
        "412distressLoan": 2000,
        "480festivalAdvance": 2000,
      },
    },
  ];

  return paysheetData;
}
