import { useNavigate, useParams } from 'react-router';
import { useState } from 'react';
import { 
  ArrowLeft, 
  ChevronDown, 
  ChevronUp, 
  Edit2, 
  Check,
  Activity,
  Layers,
  Truck,
  AlertTriangle,
  Cloud,
  Wrench as WrenchIcon,
  TrendingUp,
  AlertCircle,
  Lightbulb
} from 'lucide-react';

export default function SectionDiagnosticsPage() {
  const navigate = useNavigate();
  const { personaId, sectionId } = useParams<{ personaId: string; sectionId: string }>();
  
  const [expandedSections, setExpandedSections] = useState<string[]>(['infrastructure']);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Record<string, string>>({});
  const [reviewedFields, setReviewedFields] = useState<string[]>([]);

  // Mock section diagnostics data
  const diagnostics = {
    sectionId: sectionId || 'section-01',
    sectionNumber: '01',
    roadName: 'A14',
    description: 'Woolpit to Hagley Bridge',
    
    infrastructure: {
      crackingIntensity: { value: 'Medium', confidence: 68, aiGenerated: true },
      potholeDensity: { value: '2.1 per km', confidence: 85, aiGenerated: true },
      patchCondition: { value: 'Fair', confidence: 72, aiGenerated: true },
      surfaceFretting: { value: 'Low', confidence: 90, aiGenerated: false },
      jointCondition: { value: 'Good', confidence: 88, aiGenerated: false },
      textureDepth: { value: '0.8mm RMST', confidence: 95, aiGenerated: false },
      textureVariability: { value: 'Moderate', confidence: 78, aiGenerated: true },
      surfaceWear: { value: 'Medium', confidence: 71, aiGenerated: true },
      ruttingDepth: { value: '12mm average', confidence: 92, aiGenerated: false },
      roughnessIRI: { value: '3.2 m/km', confidence: 94, aiGenerated: false },
      transverseDeformation: { value: 'Minor', confidence: 80, aiGenerated: false },
      skiddingResistance: { value: '0.45 SCRIM', confidence: 96, aiGenerated: false },
      roadMarkingRetro: { value: 'Good', confidence: 87, aiGenerated: false },
      roadStudCondition: { value: 'Fair', confidence: 82, aiGenerated: false },
    },
    
    structural: {
      baseLayerCondition: { value: 'Good', confidence: 65, aiGenerated: true },
      subbaseStability: { value: 'Stable', confidence: 62, aiGenerated: true },
      settlementRisk: { value: 'Low', confidence: 70, aiGenerated: true },
      soilMovement: { value: 'Minimal', confidence: 68, aiGenerated: true },
      drainagePerformance: { value: 'Adequate', confidence: 78, aiGenerated: true },
      waterInfiltration: { value: 'Low risk', confidence: 73, aiGenerated: true },
      standingWater: { value: 'Rare', confidence: 85, aiGenerated: false },
    },
    
    traffic: {
      trafficVolume: { value: '42,000 AADT', confidence: 98, aiGenerated: false },
      hgvPercentage: { value: '18%', confidence: 95, aiGenerated: false },
      axleLoadIndex: { value: '1.4', confidence: 88, aiGenerated: false },
      laneLoadDistribution: { value: 'Slow lane bias', confidence: 67, aiGenerated: true },
      trafficGrowthRate: { value: '+2.1% per year', confidence: 90, aiGenerated: false },
      congestionStress: { value: 'Medium', confidence: 75, aiGenerated: true },
      insight: { 
        value: 'Heavy goods vehicles concentrate in slow lane during peak hours, accelerating rutting and cracking in that lane compared to fast lane.', 
        confidence: 72, 
        aiGenerated: true 
      },
    },
    
    safety: {
      accidentReports: { value: '3 in past year', confidence: 100, aiGenerated: false },
      crashSeverityIndex: { value: '1.2 (low)', confidence: 95, aiGenerated: false },
      nearMissReports: { value: '8 reported', confidence: 85, aiGenerated: false },
      incidentResponseTime: { value: '12 min average', confidence: 92, aiGenerated: false },
      sightDistanceObstruction: { value: 'None', confidence: 88, aiGenerated: false },
      geometryRisk: { value: 'Low', confidence: 79, aiGenerated: true },
    },
    
    environment: {
      freezeThawCycles: { value: '25 per year', confidence: 92, aiGenerated: false },
      floodRisk: { value: 'Low', confidence: 87, aiGenerated: false },
      standingWaterRisk: { value: 'Low', confidence: 83, aiGenerated: false },
      vegetationIntrusion: { value: 'Minimal', confidence: 76, aiGenerated: true },
      soilMovementRisk: { value: 'Low', confidence: 68, aiGenerated: true },
      temperatureStress: { value: 'Moderate', confidence: 81, aiGenerated: true },
    },
    
    maintenance: {
      repairHistory: { value: 'Last major repair 2019', confidence: 100, aiGenerated: false },
      maintenanceSchedule: { value: 'Scheduled Q3 2026', confidence: 95, aiGenerated: false },
      maintenanceBacklog: { value: '2 minor items', confidence: 88, aiGenerated: false },
      crewAvailability: { value: 'Good', confidence: 70, aiGenerated: true },
      contractorCapacity: { value: 'Available', confidence: 65, aiGenerated: true },
      costOfDelay: { value: '£12k per year', confidence: 74, aiGenerated: true },
    },
    
    network: {
      strategicPriority: { value: 'High', confidence: 100, aiGenerated: false },
      roadClassification: { value: 'A-Road Primary', confidence: 100, aiGenerated: false },
      freightCorridor: { value: 'Major corridor', confidence: 95, aiGenerated: false },
      emergencyRoute: { value: 'Yes', confidence: 100, aiGenerated: false },
      publicTransport: { value: 'High', confidence: 90, aiGenerated: false },
      economicSignificance: { value: 'Critical', confidence: 92, aiGenerated: false },
    },
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const startEditing = (fieldKey: string, currentValue: string) => {
    setEditingField(fieldKey);
    setEditValues(prev => ({ ...prev, [fieldKey]: currentValue }));
  };

  const commitEdit = (fieldKey: string) => {
    setEditingField(null);
    if (!reviewedFields.includes(fieldKey)) {
      setReviewedFields(prev => [...prev, fieldKey]);
    }
  };

  const cancelEdit = () => {
    setEditingField(null);
    setEditValues({});
  };

  const acceptSuggestion = (fieldKey: string) => {
    if (!reviewedFields.includes(fieldKey)) {
      setReviewedFields(prev => [...prev, fieldKey]);
    }
  };

  const isLowConfidence = (confidence: number) => confidence < 75;

  const renderField = (
    label: string,
    fieldKey: string,
    data: { value: string; confidence: number; aiGenerated: boolean },
    isTextarea: boolean = false
  ) => {
    const needsReview = data.aiGenerated && isLowConfidence(data.confidence);
    const isReviewed = reviewedFields.includes(fieldKey);

    return (
      <div className={`rounded-lg p-3 ${
        needsReview && !isReviewed
          ? 'bg-red-50/30 border-2 border-red-300/50' 
          : isReviewed 
          ? 'bg-green-50 border-2 border-green-400'
          : 'bg-gray-50'
      }`}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-700">{label}</span>
            {isReviewed && <Check className="w-4 h-4 text-green-600" />}
            {needsReview && !isReviewed && (
              <div className="w-4 h-4 rounded-full bg-red-100 border border-red-500 flex items-center justify-center">
                <span className="text-red-600 font-bold text-xs">?</span>
              </div>
            )}
          </div>
          {editingField !== fieldKey && needsReview && !isReviewed && (
            <div className="flex gap-2">
              <button 
                onClick={() => acceptSuggestion(fieldKey)}
                className="w-7 h-7 bg-green-100 hover:bg-green-200 rounded-full flex items-center justify-center transition-colors"
                title="Accept AI suggestion"
              >
                <Check className="w-4 h-4 text-green-600" />
              </button>
              <button 
                onClick={() => startEditing(fieldKey, editValues[fieldKey] || data.value)}
                className="text-blue-500 hover:text-blue-700"
              >
                <Edit2 className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
        {editingField === fieldKey ? (
          <div className="space-y-2">
            {isTextarea ? (
              <textarea
                value={editValues[fieldKey] || data.value}
                onChange={(e) => setEditValues(prev => ({ ...prev, [fieldKey]: e.target.value }))}
                className="w-full border-2 border-blue-400 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
              />
            ) : (
              <input
                type="text"
                value={editValues[fieldKey] || data.value}
                onChange={(e) => setEditValues(prev => ({ ...prev, [fieldKey]: e.target.value }))}
                className="w-full border-2 border-blue-400 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
            <div className="flex gap-2">
              <button
                onClick={() => commitEdit(fieldKey)}
                className="flex-1 bg-[#4b5563] text-white py-2 rounded font-medium text-sm hover:bg-[#374151]"
              >
                Commit
              </button>
              <button
                onClick={cancelEdit}
                className="flex-1 bg-gray-200 text-gray-700 py-2 rounded font-medium text-sm hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div>
            <p className="text-sm text-gray-900">{editValues[fieldKey] || data.value}</p>
            {data.aiGenerated && (
              <div className="flex items-center gap-1 mt-1">
                <Lightbulb className={`w-3 h-3 ${isLowConfidence(data.confidence) ? 'text-orange-500' : 'text-green-500'}`} />
                <span className={`text-xs ${isLowConfidence(data.confidence) ? 'text-orange-600' : 'text-green-600'}`}>
                  AI: {data.confidence}%
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 ml-64">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(`/persona/${personaId}/section/${sectionId}`)}
            className="p-2 hover:bg-gray-100 rounded-full -ml-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-gray-900">Detailed Diagnostics</h1>
            <p className="text-sm text-gray-600">
              {diagnostics.roadName} Section {diagnostics.sectionNumber} - {diagnostics.description}
            </p>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Infrastructure Health Section */}
        <div className="bg-gray-100 rounded-lg overflow-hidden">
          <button
            onClick={() => toggleSection('infrastructure')}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-200 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Activity className="w-5 h-5 text-gray-600" />
              <span className="font-semibold text-gray-700">Infrastructure Health</span>
            </div>
            {expandedSections.includes('infrastructure') ? (
              <ChevronUp className="w-5 h-5 text-gray-600" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-600" />
            )}
          </button>
          {expandedSections.includes('infrastructure') && (
            <div className="px-4 pb-4 space-y-3 bg-white">
              <div className="text-xs text-gray-500 italic mb-3">
                Core pavement condition derived from TRACS and defect surveys
              </div>
              
              <div className="font-semibold text-gray-700 text-sm mt-4 mb-2">Defect Statistics</div>
              {renderField('Cracking Intensity', 'crackingIntensity', diagnostics.infrastructure.crackingIntensity)}
              {renderField('Pothole Density', 'potholeDensity', diagnostics.infrastructure.potholeDensity)}
              {renderField('Patch Condition', 'patchCondition', diagnostics.infrastructure.patchCondition)}
              {renderField('Surface Fretting', 'surfaceFretting', diagnostics.infrastructure.surfaceFretting)}
              {renderField('Joint Condition', 'jointCondition', diagnostics.infrastructure.jointCondition)}
              
              <div className="font-semibold text-gray-700 text-sm mt-4 mb-2">Surface Performance</div>
              {renderField('Texture Depth (RMST)', 'textureDepth', diagnostics.infrastructure.textureDepth)}
              {renderField('Texture Variability', 'textureVariability', diagnostics.infrastructure.textureVariability)}
              {renderField('Surface Wear', 'surfaceWear', diagnostics.infrastructure.surfaceWear)}
              
              <div className="font-semibold text-gray-700 text-sm mt-4 mb-2">Geometry / Deformation</div>
              {renderField('Rutting Depth', 'ruttingDepth', diagnostics.infrastructure.ruttingDepth)}
              {renderField('Longitudinal Roughness (IRI)', 'roughnessIRI', diagnostics.infrastructure.roughnessIRI)}
              {renderField('Transverse Profile Deformation', 'transverseDeformation', diagnostics.infrastructure.transverseDeformation)}
              
              <div className="font-semibold text-gray-700 text-sm mt-4 mb-2">Safety Surface Metrics</div>
              {renderField('Skidding Resistance', 'skiddingResistance', diagnostics.infrastructure.skiddingResistance)}
              {renderField('Road Marking Retroreflectivity', 'roadMarkingRetro', diagnostics.infrastructure.roadMarkingRetro)}
              {renderField('Road Stud Condition', 'roadStudCondition', diagnostics.infrastructure.roadStudCondition)}
            </div>
          )}
        </div>

        {/* Structural Condition Section */}
        <div className="bg-gray-100 rounded-lg overflow-hidden">
          <button
            onClick={() => toggleSection('structural')}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-200 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Layers className="w-5 h-5 text-gray-600" />
              <span className="font-semibold text-gray-700">Structural Condition</span>
            </div>
            {expandedSections.includes('structural') ? (
              <ChevronUp className="w-5 h-5 text-gray-600" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-600" />
            )}
          </button>
          {expandedSections.includes('structural') && (
            <div className="px-4 pb-4 space-y-3 bg-white">
              <div className="text-xs text-gray-500 italic mb-3">
                Subsurface and long-term structural health
              </div>
              
              <div className="font-semibold text-gray-700 text-sm mt-4 mb-2">Layer Integrity</div>
              {renderField('Base Layer Condition', 'baseLayerCondition', diagnostics.structural.baseLayerCondition)}
              {renderField('Sub-base Stability', 'subbaseStability', diagnostics.structural.subbaseStability)}
              
              <div className="font-semibold text-gray-700 text-sm mt-4 mb-2">Subgrade Stability</div>
              {renderField('Settlement Risk', 'settlementRisk', diagnostics.structural.settlementRisk)}
              {renderField('Soil Movement / Subsidence', 'soilMovement', diagnostics.structural.soilMovement)}
              
              <div className="font-semibold text-gray-700 text-sm mt-4 mb-2">Water and Drainage</div>
              {renderField('Drainage Performance', 'drainagePerformance', diagnostics.structural.drainagePerformance)}
              {renderField('Water Infiltration Risk', 'waterInfiltration', diagnostics.structural.waterInfiltration)}
              {renderField('Standing Water Likelihood', 'standingWater', diagnostics.structural.standingWater)}
            </div>
          )}
        </div>

        {/* Traffic Load Section */}
        <div className="bg-gray-100 rounded-lg overflow-hidden">
          <button
            onClick={() => toggleSection('traffic')}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-200 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Truck className="w-5 h-5 text-gray-600" />
              <span className="font-semibold text-gray-700">Traffic Load</span>
            </div>
            {expandedSections.includes('traffic') ? (
              <ChevronUp className="w-5 h-5 text-gray-600" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-600" />
            )}
          </button>
          {expandedSections.includes('traffic') && (
            <div className="px-4 pb-4 space-y-3 bg-white">
              <div className="text-xs text-gray-500 italic mb-3">
                Primary driver of deterioration
              </div>
              
              {renderField('Traffic Volume', 'trafficVolume', diagnostics.traffic.trafficVolume)}
              {renderField('Heavy Goods Vehicle Percentage', 'hgvPercentage', diagnostics.traffic.hgvPercentage)}
              {renderField('Axle Load Index', 'axleLoadIndex', diagnostics.traffic.axleLoadIndex)}
              {renderField('Lane Load Distribution', 'laneLoadDistribution', diagnostics.traffic.laneLoadDistribution)}
              {renderField('Traffic Growth Rate', 'trafficGrowthRate', diagnostics.traffic.trafficGrowthRate)}
              {renderField('Congestion Stress', 'congestionStress', diagnostics.traffic.congestionStress)}
              
              <div className="font-semibold text-gray-700 text-sm mt-4 mb-2">AI Insight</div>
              {renderField('Traffic Pattern Analysis', 'trafficInsight', diagnostics.traffic.insight, true)}
            </div>
          )}
        </div>

        {/* Safety Risk Section */}
        <div className="bg-gray-100 rounded-lg overflow-hidden">
          <button
            onClick={() => toggleSection('safety')}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-200 transition-colors"
          >
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-gray-600" />
              <span className="font-semibold text-gray-700">Safety Risk</span>
            </div>
            {expandedSections.includes('safety') ? (
              <ChevronUp className="w-5 h-5 text-gray-600" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-600" />
            )}
          </button>
          {expandedSections.includes('safety') && (
            <div className="px-4 pb-4 space-y-3 bg-white">
              <div className="text-xs text-gray-500 italic mb-3">
                Combines road condition with real-world outcomes
              </div>
              
              {renderField('Accident Reports', 'accidentReports', diagnostics.safety.accidentReports)}
              {renderField('Crash Severity Index', 'crashSeverityIndex', diagnostics.safety.crashSeverityIndex)}
              {renderField('Near-Miss Reports', 'nearMissReports', diagnostics.safety.nearMissReports)}
              {renderField('Incident Response Times', 'incidentResponseTime', diagnostics.safety.incidentResponseTime)}
              {renderField('Sight Distance Obstruction', 'sightDistanceObstruction', diagnostics.safety.sightDistanceObstruction)}
              {renderField('Road Geometry Risk', 'geometryRisk', diagnostics.safety.geometryRisk)}
            </div>
          )}
        </div>

        {/* Environment Section */}
        <div className="bg-gray-100 rounded-lg overflow-hidden">
          <button
            onClick={() => toggleSection('environment')}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-200 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Cloud className="w-5 h-5 text-gray-600" />
              <span className="font-semibold text-gray-700">Environment</span>
            </div>
            {expandedSections.includes('environment') ? (
              <ChevronUp className="w-5 h-5 text-gray-600" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-600" />
            )}
          </button>
          {expandedSections.includes('environment') && (
            <div className="px-4 pb-4 space-y-3 bg-white">
              <div className="text-xs text-gray-500 italic mb-3">
                Environmental stress factors affecting deterioration
              </div>
              
              {renderField('Freeze–Thaw Cycle Exposure', 'freezeThawCycles', diagnostics.environment.freezeThawCycles)}
              {renderField('Flood Risk', 'floodRisk', diagnostics.environment.floodRisk)}
              {renderField('Standing Water Risk', 'standingWaterRisk', diagnostics.environment.standingWaterRisk)}
              {renderField('Vegetation Intrusion', 'vegetationIntrusion', diagnostics.environment.vegetationIntrusion)}
              {renderField('Soil Movement Risk', 'soilMovementRisk', diagnostics.environment.soilMovementRisk)}
              {renderField('Temperature Stress', 'temperatureStress', diagnostics.environment.temperatureStress)}
            </div>
          )}
        </div>

        {/* Maintenance Context Section */}
        <div className="bg-gray-100 rounded-lg overflow-hidden">
          <button
            onClick={() => toggleSection('maintenance')}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-200 transition-colors"
          >
            <div className="flex items-center gap-3">
              <WrenchIcon className="w-5 h-5 text-gray-600" />
              <span className="font-semibold text-gray-700">Maintenance Context</span>
            </div>
            {expandedSections.includes('maintenance') ? (
              <ChevronUp className="w-5 h-5 text-gray-600" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-600" />
            )}
          </button>
          {expandedSections.includes('maintenance') && (
            <div className="px-4 pb-4 space-y-3 bg-white">
              <div className="text-xs text-gray-500 italic mb-3">
                Factors influencing repair decisions
              </div>
              
              {renderField('Repair History', 'repairHistory', diagnostics.maintenance.repairHistory)}
              {renderField('Maintenance Schedule', 'maintenanceSchedule', diagnostics.maintenance.maintenanceSchedule)}
              {renderField('Maintenance Backlog', 'maintenanceBacklog', diagnostics.maintenance.maintenanceBacklog)}
              {renderField('Crew Availability', 'crewAvailability', diagnostics.maintenance.crewAvailability)}
              {renderField('Contractor Capacity', 'contractorCapacity', diagnostics.maintenance.contractorCapacity)}
              {renderField('Cost of Delay', 'costOfDelay', diagnostics.maintenance.costOfDelay)}
            </div>
          )}
        </div>

        {/* Network Importance Section */}
        <div className="bg-gray-100 rounded-lg overflow-hidden">
          <button
            onClick={() => toggleSection('network')}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-200 transition-colors"
          >
            <div className="flex items-center gap-3">
              <TrendingUp className="w-5 h-5 text-gray-600" />
              <span className="font-semibold text-gray-700">Network Importance</span>
            </div>
            {expandedSections.includes('network') ? (
              <ChevronUp className="w-5 h-5 text-gray-600" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-600" />
            )}
          </button>
          {expandedSections.includes('network') && (
            <div className="px-4 pb-4 space-y-3 bg-white">
              <div className="text-xs text-gray-500 italic mb-3">
                Determines priority even when deterioration is similar
              </div>
              
              {renderField('Strategic Priority', 'strategicPriority', diagnostics.network.strategicPriority)}
              {renderField('Road Classification', 'roadClassification', diagnostics.network.roadClassification)}
              {renderField('Freight Corridor Importance', 'freightCorridor', diagnostics.network.freightCorridor)}
              {renderField('Emergency Route Importance', 'emergencyRoute', diagnostics.network.emergencyRoute)}
              {renderField('Public Transport Dependency', 'publicTransport', diagnostics.network.publicTransport)}
              {renderField('Economic Corridor Significance', 'economicSignificance', diagnostics.network.economicSignificance)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
