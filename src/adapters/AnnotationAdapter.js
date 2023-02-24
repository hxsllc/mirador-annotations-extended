/* Annotation adapter for usage with heidelberger annotation backend
 * important! to create an annotation the id has to consist of the annotation id and the enpoint url
 * further actions on an annotation (update/delete) have to get adressed to the annotation id only
 * this is not pretty but it is the way it works
*/

export default class AnnotationAdapter {
    constructor(canvasId, endpointUrl) {
        this.canvasId = canvasId;
        this.endpointUrl = endpointUrl;
    }

    get annotationPageId() {
        return `${this.endpointUrl}/?uri=${this.canvasId}`;
    }

    async create(annotation) {
        return fetch(this.endpointUrl, {
            body: JSON.stringify({
                id: `${this.endpointUrl}/${annotation.id}`,
                type: 'Annotation',
                created: new Date().toISOString(),
                ...(annotation.creator && {creator: annotation.creator}),
                uri: this.canvasId,
                //...(annotation.motivation && {motivation: annotation.motivation}),
                motivation: annotation.motivation,
                target: annotation.target,
                body: annotation.body,
            }),

            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            dataType: 'json',
            method: 'POST',
          })
            .then((response) => this.all())
            .catch(() => this.all());
    }


    async update(annotation) {
        return fetch(annotation.id, {
            body: JSON.stringify({
                id: `${annotation.id}`,
                type: 'Annotation',
                modified: new Date().toISOString(),
                ...(annotation.creator && {creator: annotation.creator}),
                uri: this.canvasId,
                //...(annotation.motivation && {motivation: annotation.motivation}),
                motivation: annotation.motivation,
                target: annotation.target,
                body: annotation.body,
            }),
            headers: {
                Accept: 'application/ld+json',
                'Content-Type': 'application/json; charset=utf-8',
                'X-Anno-Collection': "default",
                'X-Anno-Context': "http://www.w3.org/ns/anno.jsonld"
            },
            dataType: 'json',
            method: 'PUT',
          })
            .then((response) => this.all())
            .catch(() => this.all());
    }


    async delete(annotationId) {
        return fetch(`${annotationId}`, {
            headers: {
                Accept: 'application/ld+json',
                'Content-Type': 'application/json; charset=utf-8',
                'X-Anno-Collection': "default",
                'X-Anno-Context': "http://www.w3.org/ns/anno.jsonld"
              },
            dataType: 'json',
            method: 'DELETE',
          })
            .then((response) => this.all())
            .catch(() => this.all());
    }


    async all() {
        // GET-Request for annotation Manifest
        const resp = await (await fetch(this.annotationPageId)).json();
        console.log(resp);

        // check if there are annotations available
        if(resp.hasOwnProperty('first')) {
            // return an annotation page created out of the annotation items for displaying in Mirador3
            console.log('this is all');
            console.log((this.returnAnnotationPage(resp.first.items)));
            return this.returnAnnotationPage(resp.first.items);
        }
        else {
            return [];
        }
    }

    // basic sample function to create an annotation body
    static createAnnotation(annotation) {
        let annotationBody = {};
        annotationBody.id = `${this.endpointUrl}/${encodeURIComponent(annotation.id)}`;
        annotationBody.type = 'Annotation';
        annotationBody.created = new Date().toISOString();
        annotation.creator && ( annotationBody.creator = annotation.creator );
        annotationBody.uri = this.canvasId;
        //annotation.motivation && ( annotationBody.motivation = annotation.motivation );
        annotationBody.motivation = annotation.motivation;
        annotationBody.target = annotation.target;
        annotationBody.body = annotation.body;
        return annotationBody;
    }

    // create AnnotationPage from all annotations
    returnAnnotationPage(annotation) {
        if (Array.isArray(annotation)) {
            const annotationList = annotation.map(anno => this.returnMiradorAnnotation(anno, this.canvasId));

            return {
                id: this.annotationPageId,
                items: annotationList,
                type: 'AnnotationPage'
            };
        }
        return annotation;
    }

    createEndpointTarget(annotation) {
        /*let target = {};
        if(annotation.target.source) {
            target = annotation.target;
        } else {
            target.source = annotation.target;
        }
        target.id = this.endpointUrl + '/' + annotation.id + '/' + this.workspaceId;*/
        return annotation.target;
    }

    returnMiradorAnnotation(annotation, canvasId) {
        const anno = {
            id: annotation.id,
            motivation: 'commenting',
            type: annotation.type,
            created: annotation.created,
            ...(annotation.creator && { creator: annotation.creator }),
            motivation: annotation.motivation,
            //...(annotation.motivation && { motivation: annotation.motivation}),
            uri: annotation.uri,
            target: annotation.target,
            body: []
        };
        if(annotation.body) {
            anno.body = annotation.body;
        }
        return anno;
    }

    static returnAnnotationTarget(annoTarget, canvasId) {
        return annoTarget;

    }

    static returnAnnotationSelector(selector) {
        if(Array.isArray(selector)) {
            return selector;
        } else {
            let SvgSelector = {};
            let FragmentSelector = {};
            if(selector.type == 'SvgSelector') {
                SvgSelector.type = selector.type;
                SvgSelector.value = selector.value;
            }

            if(selector.oa_svg_value) {
                FragmentSelector.type = "FragmentSelector";
                FragmentSelector.value = selector.oa_svg_value;
            };

            return [ FragmentSelector, SvgSelector ];
        }
    }
}
