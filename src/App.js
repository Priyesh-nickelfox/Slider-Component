import { Box } from '@mui/material';
import  SliderCarousel from './Slider/ SliderCarousel';

function App() {
  return (
    <Box sx={{backgroundColor: 'grey', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw'}}>
      <SliderCarousel />
    </Box>
  );
}

export default App;