import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { 
  Shield, 
  CheckCircle, 
  AlertTriangle, 
  Download, 
  ArrowRight,
  Target,
  Users,
  FileText,
  BarChart3
} from 'lucide-react';
import { generateResultsPdf } from '../../utils/generatePdf';

const AssessmentResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { type, score, level1Ready, mode, responses, level } = location.state || {};

  // Calculate results based on responses
  const calculateDetailedResults = () => {
    if (!responses) return null;
    
    const totalResponses = Object.keys(responses).length;
    const yesResponses = Object.values(responses).filter(r => r === 'yes').length;
    const noResponses = Object.values(responses).filter(r => r === 'no').length;
    const partialResponses = Object.values(responses).filter(r => r === 'partial').length;
    
    const calculatedScore = Math.round(((yesResponses + partialResponses * 0.5) / totalResponses) * 100);
    
    return {
      score: calculatedScore,
      breakdown: {
        implemented: yesResponses,
        partial: partialResponses,
        gaps: noResponses,
        total: totalResponses
      }
    };
  };

  const results = calculateDetailedResults();
  const finalScore = results?.score || score || 0;

  const getRiskLevel = (score: number) => {
    if (score >= 90) return { level: 'Low Risk', color: 'text-green-600', bg: 'bg-green-100 dark:bg-green-900/30' };
    if (score >= 70) return { level: 'Moderate Risk', color: 'text-blue-600', bg: 'bg-blue-100 dark:bg-blue-900/30' };
    if (score >= 50) return { level: 'High Risk', color: 'text-orange-600', bg: 'bg-orange-100 dark:bg-orange-900/30' };
    return { level: 'Critical Risk', color: 'text-red-600', bg: 'bg-red-100 dark:bg-red-900/30' };
  };

  const riskInfo = getRiskLevel(finalScore);

  const sectionScores = [
    { title: 'Access Control', percentage: 75 },
    { title: 'Awareness and Training', percentage: 85 },
    { title: 'Configuration Management', percentage: 60 },
    { title: 'Identification and Authentication', percentage: 80 }
  ];

  const handleDownloadReport = () => {
    generateResultsPdf(
      `CMMC Level ${level || 1} Assessment Results`,
      finalScore,
      sectionScores,
      new Date().toLocaleDateString(),
      `cmmc-level-${level || 1}-assessment-results.pdf`
    );
  };

  const handleStartImplementation = () => {
    if (mode === 'team') {
      navigate('/app/dashboard');
    } else {
      // For solo mode, provide implementation guidance
      navigate('/app/controls');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            CMMC Level {level || 1} Assessment Results
          </h1>
          <p className="text-muted-foreground">
            Your CMMC compliance assessment is complete
          </p>
        </div>

        {/* Overall Score */}
        <Card className="mb-8">
          <CardContent className="p-8 text-center">
            <div className="flex justify-center items-center mb-6">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-3xl font-bold">{finalScore}%</div>
                  <div className="text-sm">Compliant</div>
                </div>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Overall Compliance Score: {finalScore}%
            </h2>
            
            <div className={`inline-block px-6 py-3 rounded-full text-lg font-semibold ${riskInfo.bg} ${riskInfo.color}`}>
              {riskInfo.level}
            </div>
            
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              {finalScore >= 80 && "Excellent compliance posture! You're well-positioned for CMMC certification."}
              {finalScore >= 60 && finalScore < 80 && "Good progress with some areas needing improvement before certification."}
              {finalScore >= 40 && finalScore < 60 && "Significant gaps identified. Focus on high-priority recommendations."}
              {finalScore < 40 && "Critical compliance gaps require immediate attention before pursuing certification."}
            </p>
          </CardContent>
        </Card>

        {/* Detailed Breakdown */}
        {results && (
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-foreground mb-6">Assessment Breakdown</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-green-50 dark:bg-green-950/30 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{results.breakdown.implemented}</div>
                  <div className="text-sm text-green-700 dark:text-green-300">Fully Implemented</div>
                </div>
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{results.breakdown.partial}</div>
                  <div className="text-sm text-blue-700 dark:text-blue-300">Partially Implemented</div>
                </div>
                <div className="text-center p-4 bg-red-50 dark:bg-red-950/30 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">{results.breakdown.gaps}</div>
                  <div className="text-sm text-red-700 dark:text-red-300">Implementation Gaps</div>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-950/30 rounded-lg">
                  <div className="text-2xl font-bold text-gray-600">{results.breakdown.total}</div>
                  <div className="text-sm text-gray-700 dark:text-gray-300">Total Assessed</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Section Scores */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold text-foreground mb-6">Control Family Scores</h3>
            <div className="space-y-4">
              {sectionScores.map((section, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-foreground">{section.title}</span>
                      <span className="text-sm text-muted-foreground">{section.percentage}%</span>
                    </div>
                    <div className="w-full bg-muted h-2 rounded-full">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all" 
                        style={{ width: `${section.percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold text-foreground mb-6">Recommended Next Steps</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-foreground">Start Implementation Planning</h4>
                    <p className="text-sm text-muted-foreground">
                      Create a detailed implementation roadmap based on your assessment results
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-foreground">Address Critical Gaps</h4>
                    <p className="text-sm text-muted-foreground">
                      Focus on high-priority control implementations first
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-foreground">Generate Documentation</h4>
                    <p className="text-sm text-muted-foreground">
                      Create SSP and POA&M documents for your implementation
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg">
                <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-3">
                  {mode === 'team' ? 'Team Implementation' : 'Solo Implementation'}
                </h4>
                <p className="text-sm text-blue-700 dark:text-blue-300 mb-4">
                  {mode === 'team' 
                    ? 'Set up your team with role-based responsibilities and collaborative workflows'
                    : 'Continue with streamlined implementation focused on essential deliverables'
                  }
                </p>
                <Button 
                  size="sm" 
                  onClick={handleStartImplementation}
                  className="w-full"
                >
                  {mode === 'team' ? 'Setup Team Dashboard' : 'Start Implementation'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" onClick={handleDownloadReport}>
            <Download className="mr-2 h-5 w-5" />
            Download Assessment Report
          </Button>
          
          <Button size="lg" variant="outline" onClick={handleStartImplementation}>
            {mode === 'team' ? (
              <>
                <Users className="mr-2 h-5 w-5" />
                Start Team Implementation
              </>
            ) : (
              <>
                <Target className="mr-2 h-5 w-5" />
                Start Solo Implementation
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AssessmentResults;