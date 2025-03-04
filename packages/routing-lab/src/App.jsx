import { Homepage } from "./Homepage";
import { AccountSettings } from "./AccountSettings";
import { ImageGallery } from "./images/ImageGallery.jsx";
import { ImageDetails } from "./images/ImageDetails.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage userName="John Doe" />} />
      <Route path="/account" element={<AccountSettings />} />
      <Route path="/images" element={<ImageGallery />}>
        <Route path="/:imageId" element={<ImageDetails imageId="0" />} />
      </Route>
    </Routes>
  );
  const POSSIBLE_PAGES = [
    <Homepage userName="John Doe" />,
    <AccountSettings />,
    <ImageGallery />,
    <ImageDetails imageId="0" />,
  ];

  return POSSIBLE_PAGES[0];
}

export default App;
