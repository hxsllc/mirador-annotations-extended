/** */
export default class WebAnnotation {
    /** */
    constructor({
        canvasId, id, body, creator, motivation, manifestId, target
    }) {
        this.id = id;
        this.canvasId = canvasId;
        this.target = target;
        this.body = body;
        this.creator = creator;
        this.motivation = motivation;
        this.manifestId = manifestId;
    }

    /** */
    toJson() {
        if(this.creator) {
            return {
                body: this.body,
                id: this.id,
                creator: this.returnCreator(),
                motivation: this.returnMotivation(),
                target: this.returnTarget(),
                type: 'Annotation',
            }
        }
        return {
            body: this.body,
            id: this.id,
            motivation: this.returnMotivation(),
            target: this.returnTarget(),
            type: 'Annotation',
        };
    }

    /** */
    returnTarget() {
        let target = this.canvasId;
        if(this.target){
            target = {
                source: this.source(),
                selector: this.target,
            }
        }
        return target;
    }

    returnCreator() {
        return {
            type: 'Person',
            name: this.creator,
            id: `https://anno.iiif.arthistoricum.net/user/1`
        }

    }

    returnMotivation() {
        if(this.motivation) {
            return this.motivation;
        }
        return 'commenting';
    }

    /** */
    source() {
        let source = this.canvasId;
        if (this.manifest) {
            source = {
                id: this.canvasId,
                partOf: {
                    id: this.manifest.id,
                    type: 'Manifest',
                },
                type: 'Canvas',
            };
        }
        return source;
    }
}
