import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import Navigation from "./navigation";
import { TextScaleProvider } from "./components/TextScaleContext";

export default function App() {
  return (
    <GluestackUIProvider config={config}>
      <TextScaleProvider>
        <Navigation />
      </TextScaleProvider>
    </GluestackUIProvider>
  );
}
