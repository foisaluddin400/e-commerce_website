import CreativeEditor from '@cesdk/cesdk-js/react';

// Configure CreativeEditor SDK
const config = {
  license: 'nbmRqfagdbuRXmU_MgtUUEw4K_EEffOEvdwsQV7ZVkauXpSaog_e4viJEXP8OOz4', // ⚠️ REPLACE WITH YOUR ACTUAL LICENSE KEY
};

// Initialization function called after SDK instance is created
const init = async (cesdk) => {
  // Do something with the instance of CreativeEditor SDK (e.g., populate
  // the asset library with default / demo asset sources)
  await Promise.all([
    cesdk.addDefaultAssetSources(),
    cesdk.addDemoAssetSources({
      sceneMode: 'Design',
      withUploadAssetSources: true,
    }),
  ]);

  // Create a new design scene in the editor
  await cesdk.createDesignScene();
};

const Testing = () => {
  return (
    <CreativeEditor
      config={config}
      init={init}
      width="100vw"
      height="100vh"
    />
  );
};

export default Testing;
