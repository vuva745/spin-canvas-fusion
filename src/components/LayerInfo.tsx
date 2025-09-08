import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface LayerInfoProps {
  activeLayer: number;
}

export const LayerInfo = ({ activeLayer }: LayerInfoProps) => {
  const getLayerDetails = () => {
    switch (activeLayer) {
      case 1:
        return {
          title: "Static Display Layer",
          description: "Basic sponsor display with minimal animations",
          features: ["Standard Logo Display", "Static Layout", "Energy Efficient", "24/7 Operation"],
          compatibility: ["All Devices", "Legacy Systems", "Low Bandwidth"],
          icon: "📺",
          color: "bg-muted/50 border-muted",
        };
      case 2:
        return {
          title: "Hologram Effects Layer",
          description: "3D holographic projections with depth perception",
          features: ["3D Logo Projection", "Depth Effects", "Light Refraction", "Atmospheric Rendering"],
          compatibility: ["5D Beamer System", "Advanced Tablets", "High-End Displays"],
          icon: "🔮",
          color: "bg-blue-500/10 border-blue-400/40",
        };
      case 3:
        return {
          title: "Augmented Reality Layer",
          description: "Mixed reality integration with real-world overlay",
          features: ["AR Object Tracking", "Real-time Overlay", "Interactive Elements", "Gesture Control"],
          compatibility: ["AR Glasses", "Mobile AR", "Walking Billboards", "Interactive Kiosks"],
          icon: "🥽",
          color: "bg-green-500/10 border-green-400/40",
        };
      case 4:
        return {
          title: "Spinning Animation Layer",
          description: "Dynamic slot animations with subtle movement effects",
          features: ["Smooth Rotations", "Hover Effects", "Dynamic Positioning", "Performance Optimized"],
          compatibility: ["All Platforms", "Tablets", "Billboards", "5D Beamer"],
          icon: "⚡",
          color: "bg-gold/10 border-gold/40",
        };
      default:
        return null;
    }
  };

  const layerDetails = getLayerDetails();
  
  if (!layerDetails) return null;

  return (
    <Card className={`mt-8 max-w-2xl mx-auto ${layerDetails.color} backdrop-blur-sm`}>
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-3">
          <span className="text-2xl">{layerDetails.icon}</span>
          <span className="text-xl">{layerDetails.title}</span>
        </CardTitle>
        <CardDescription className="text-base">
          {layerDetails.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Features */}
        <div>
          <h4 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wide">
            Key Features
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {layerDetails.features.map((feature, index) => (
              <Badge key={index} variant="secondary" className="justify-start text-xs">
                ✓ {feature}
              </Badge>
            ))}
          </div>
        </div>

        {/* Compatibility */}
        <div>
          <h4 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wide">
            Platform Compatibility
          </h4>
          <div className="flex flex-wrap gap-2">
            {layerDetails.compatibility.map((platform, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {platform}
              </Badge>
            ))}
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
          <div className="text-center">
            <div className="text-lg font-bold text-primary">
              {activeLayer === 1 ? "100%" : activeLayer === 2 ? "85%" : activeLayer === 3 ? "90%" : "95%"}
            </div>
            <div className="text-xs text-muted-foreground">Performance</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-primary">
              {activeLayer === 1 ? "Low" : activeLayer === 2 ? "High" : activeLayer === 3 ? "Medium" : "Medium"}
            </div>
            <div className="text-xs text-muted-foreground">Resource Usage</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-primary">
              24/7
            </div>
            <div className="text-xs text-muted-foreground">Uptime</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};