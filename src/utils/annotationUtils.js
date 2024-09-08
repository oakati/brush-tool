// annotationUtils.js

export class Annotation {
    constructor(type, points, className) {
        this.type = type;
        this.points = points;
        this.className = className;
    }
}

export class AIMask extends Annotation {
    constructor(maskData, className) {
        super('aiMask', [], className);
        this.maskData = maskData;
    }
}

export class AnnotationJSONCreator {
    constructor(imageName) {
        this.imageName = imageName;
        this.annotations = [];
    }

    addAnnotation(annotation) {
        this.annotations.push(annotation);
    }

    removeAnnotation(index) {
        this.annotations.splice(index, 1);
    }

    updateAnnotation(index, updatedAnnotation) {
        this.annotations[index] = updatedAnnotation;
    }

    generateJSON() {
        return JSON.stringify({
            imageName: this.imageName,
            annotations: this.annotations.map(ann => ({
                type: ann.type,
                points: ann.points,
                className: ann.className,
                ...(ann.type === 'aiMask' && { maskData: ann.maskData })
            }))
        }, null, 2);
    }

    loadFromJSON(jsonString) {
        const data = JSON.parse(jsonString);
        this.imageName = data.imageName;
        this.annotations = data.annotations.map(ann => {
            if (ann.type === 'aiMask') {
                return new AIMask(ann.maskData, ann.className);
            }
            return new Annotation(ann.type, ann.points, ann.className);
        });
    }
}