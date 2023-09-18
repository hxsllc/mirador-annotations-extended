/** */
export default class AnnotationStoreAdapter {
    /** */
    constructor(canvasId, serverUrl) {
        this.canvasId = canvasId;
        this.serverUrl = serverUrl;
    }

    /** */
    async create(annotation) {
        return fetch(this.serverUrl + "/api/annotations/create", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'User-Agent': 'XY'
            },
            body: JSON.stringify({
                annotation: {
                    canvas: this.canvasId,
                    data: JSON.stringify(annotation),
                    uuid: annotation.id,
                },
            }),
        }).then(async (response) => {
            return await this.all();
        }).catch(async () => {
            return await this.all();
        });
    }

    /** */
    async update(annotation) {
        return fetch(this.serverUrl + "/api/annotations/update", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'User-Agent': 'XY'
            },
            body: JSON.stringify({
                annotation: {
                    data: JSON.stringify(annotation),
                    uuid: annotation.id,
                },
            }),
        }).then(async (response) => {
            return await this.all();
        }).catch(async () => {
            return await this.all()
        });
    }

    /** */
    async delete(annoId) {
        return fetch(this.serverUrl + "/api/annotations/delete", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'User-Agent': 'XY'
            },
            body: JSON.stringify({
                "annoId": annoId
            }),
        }).then(async (response) => {
            return await this.all()
        }).catch(async () => {
            return await this.all()
        });
    }

    /** */
    async all() {
        return fetch(this.serverUrl + "/api/annotations/all", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'User-Agent': 'XY'
            },
            body: JSON.stringify({
                "canvasId": this.canvasId
            }),
        }).then((response) => {
            return response.json();
        }).then(data => {
            return data.annotations;
        }).catch((err) => {
            console.log("Error occured: ", err);
            return null;
        });
    }

    /** */
    async getByCategory(categories) {
        return fetch(this.serverUrl + "/api/annotations/get_by_categories", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'User-Agent': 'XY'
            },
            body: JSON.stringify({
                "canvasId": this.canvasId,
                "categories": categories
            }),
        }).then((response) => {
            return response.json();
        }).then(data => {
            return data.annotations;
        }).catch((err) => {
            console.log("Error occured: ", err);
            return null;
        });
    }
}