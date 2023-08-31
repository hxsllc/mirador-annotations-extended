
import mirador from 'mirador/dist/es/src/index';
import annotationPlugins from '../../src';
import LocalStorageAdapter from '../../src/adapters/LocalStorageAdapter';
import AnnotationStoreAdapter from '../../src/adapters/AnnotationStoreAdapter';

// const endpointUrl = 'http://127.0.0.1:3000/annotations';
// const SERVER_URL = 'http://127.0.0.1:8000';
const SERVER_URL = 'https://ds20.reclaim.hosting/annophp/public';

const config = {
    annotation: {
        adapter: (canvasId) => new LocalStorageAdapter(`localStorage://?canvasId=${canvasId}`),
        // adapter: (canvasId) => new AnnotationStoreAdapter(canvasId, SERVER_URL),
        exportLocalStorageAnnotations: false, // display annotation JSON export button
    },
    id: 'demo',
    window: {
        defaultSideBarPanel: 'annotations',
        sideBarOpenByDefault: true,
    },
    catalog: [{
        manifestId: 'https://iiif.harvardartmuseums.org/manifests/object/299843',
    }],
    windows: [{
        loadedManifest: 'https://iiif.harvardartmuseums.org/manifests/object/299843',
    }],
};

mirador.viewer(config, [...annotationPlugins]);
