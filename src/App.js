import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import { AppContainer } from './components/StyledComponents';
import { TextNodeDemo } from './components/TextNodeDemo';
import { IntegrationDemo } from './components/IntegrationDemo';

function App() {
  return (
    <AppContainer>
      <PipelineToolbar />
      <PipelineUI />
      <SubmitButton />
      <TextNodeDemo show={false} />
      <IntegrationDemo show={false} />
    </AppContainer>
  );
}

export default App;
