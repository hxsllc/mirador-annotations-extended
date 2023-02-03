
import mirador from 'mirador/dist/es/src/index';
import annotationPlugins from '../../src';
import LocalStorageAdapter from '../../src/adapters/LocalStorageAdapter';
import AnnototAdapter from '../../src/adapters/AnnototAdapter';

const endpointUrl = 'http://127.0.0.1:3000/annotations';
const config = {
    annotation: {
        adapter: (canvasId) => new LocalStorageAdapter(`localStorage://?canvasId=${canvasId}`),
        // adapter: (canvasId) => new AnnototAdapter(canvasId, endpointUrl),
        exportLocalStorageAnnotations: true, // display annotation JSON export button
    },
    id: 'demo',
    window: {
        defaultSideBarPanel: 'annotations',
        sideBarOpenByDefault: true,
    },
    catalog: [{
        manifestId: 'https://iiif.harvardartmuseums.org/manifests/object/299843',
    },
    {
        manifestId: 'https://iiif.arthistoricum.net/proxy/fotothek/os_ub_0006184/manifest.json',
    },
    {
        manifestId: 'https://iiif.arthistoricum.net/proxy/fotothek/adf_cva_0000292/manifest.json',
    }],
    windows: [{
        loadedManifest: 'https://iiif.arthistoricum.net/proxy/fotothek/os_ub_0006184/manifest.json',
    }],
};

mirador.viewer(config, [...annotationPlugins]);
