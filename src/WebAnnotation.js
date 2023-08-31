/** */
export default class WebAnnotation {
  /** */
  constructor({
    body, canvasId, creator, category, id, motivation, manifestId, target,
  }) {
    this.id = id;
    this.canvasId = canvasId;
    this.category = category;
    this.target = target;
    this.body = body;
    this.creator = creator;
    this.motivation = motivation;
    this.manifestId = manifestId;
  }

  /** */
  toJson() {
    if (this.creator) {
      return {
        body: this.body,
        creator: this.returnCreator(),
        createdOn: this.returnCurTime(),
        id: this.id,
        motivation: this.returnMotivation(),
        category: this.category,
        target: this.returnTarget(),
        type: 'Annotation',
      };
    }
    return {
      body: this.body,
      id: this.id,
      motivation: this.returnMotivation(),
      category: this.category,
      createdOn: this.returnCurTime(),
      target: this.returnTarget(),
      type: 'Annotation',
    };
  }

  returnCurTime() {
    var now = new Date();

    var dformat = [now.getMonth() + 1, now.getDate(), now.getFullYear()].join('/') + ' ' + [now.getHours(), now.getMinutes(), now.getSeconds()].join(':');
    return dformat;
  }

  /** */
  returnTarget() {
    let target = this.canvasId;
    if (this.target) {
      target = {
        selector: this.target,
        source: this.source(),
      };
    }
    return target;
  }

  /** */
  returnCreator() {
    return {
      id: 'https://anno.iiif.arthistoricum.net/user/1',
      name: this.creator,
      type: 'Person',
    };
  }

  /** */
  returnMotivation() {
    if (this.motivation) {
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
