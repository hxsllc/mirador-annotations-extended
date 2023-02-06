/** */
export default class WebAnnotation {
    /** */
    constructor({
        canvasId, id, body, creator, motivation, manifestId, target
    }) {
        /*this.id = id;
        this.canvasId = canvasId;
        this.target = target;
        this.body = body;
        this.creator = creator;
        this.motivation = motivation;
        this.manifestId = manifestId;*/
        console.log('this is body:');
        console.log(body);
        console.log('this is creator: ');
        console.log(creator);
        console.log('this is motivation');
        console.log(motivation);
        console.log('this is target');
        console.log(target);
    }

    /** */
    toJson() {
        return {
            body: this.createBody(),
            id: this.id,
            motivation: 'commenting',
            target: this.target(),
            type: 'Annotation',
        };
    }

    /** */
    createBody() {
        let bodies = [];
        if (this.body) {
            bodies.push({
                type: 'TextualBody',
                value: this.body,
            });
        }
        if (this.tags) {
            bodies = bodies.concat(this.tags.map((tag) => ({
                purpose: 'tagging',
                type: 'TextualBody',
                value: tag,
            })));
        }
        if (bodies.length === 1) {
            return bodies[0];
        }
        return bodies;
    }

    /** */
    target() {
        let target = this.canvasId;
        if (this.svg || this.xywh) {
            target = {
                source: this.source(),
            };
        }
        if (this.svg) {
            target.selector = {
                type: 'SvgSelector',
                value: this.svg,
            };
        }
        if (this.xywh) {
            const fragsel = {
                type: 'FragmentSelector',
                value: `xywh=${this.xywh}`,
            };
            if (target.selector) {
                // add fragment selector
                target.selector = [
                    fragsel,
                    target.selector,
                ];
            } else {
                target.selector = fragsel;
            }
        }
        return target;
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
