import MiradorAnnotation from './containers/MiradorAnnotation';
import ExternalStorageAnnotation from './containers/ExternalStorageAnnotation';
import CanvasAnnotationsWrapper from './containers/CanvasAnnotationsWrapper';
import AnnotationCreation from './containers/AnnotationCreation';
import AnnotationViewer from './containers/AnnotationViewer';
import AnnotationDetailViewer from './containers/AnnotationDetailViewer';
import WindowSideBarButtonWrapper from './containers/WindowSideBarButtonWrapper';
import translations from './locales';

export default [
  {
    component: MiradorAnnotation,
    mode: 'wrap',
    target: 'AnnotationSettings',
    config: {
      translations,
    }
  },
  {
    component: ExternalStorageAnnotation,
    mode: 'wrap',
    target: 'Window',
  },
  {
    component: CanvasAnnotationsWrapper,
    mode: 'wrap',
    target: 'CanvasAnnotations',
    config: {
      translations
    }
  },
  {
    companionWindowKey: 'annotationCreation',
    component: AnnotationCreation,
    config: {
      translations
    }
  },
  {
    companionWindowKey: 'annotationViewer',
    component: AnnotationViewer,
    config: {
      translations
    }
  },
  {
    companionWindowKey: 'annotationDetailViewer',
    component: AnnotationDetailViewer,
    config: {
      translations
    }
  },
  {
    component: WindowSideBarButtonWrapper,
    mode: 'wrap',
    target: 'WindowSideBarButtons',
  }
];
