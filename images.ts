//* preview when uploading images (ReactJS)
function previewImage(event: React.ChangeEvent<HTMLInputElement>, targetArray: string[], index?: number) {
    if (!event.target.files || event.target.files.length === 0) return;

    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
        const url = e.target?.result as string;

        if (index !== undefined) {
            // Fill missing indexes with empty strings
            for (let i = 0; i < index; i++) {
                if (targetArray[i] === undefined) targetArray[i] = '';
            }
            targetArray[index] = url;
        } else {
            targetArray[0] = url; // or push to array
        }
    };
    reader.readAsDataURL(file);
};

//* preview when uploading images (Angular)
function previewImage(event: Event, targetObj: any, targetKey: string, index: number) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
        const url = e.target.result as string;

        this.ngZone.run(() => {
            if (index !== undefined) {
                if (!targetObj[targetKey]) targetObj[targetKey] = [];

                // Fill missing indexes with empty strings
                for (let i = 0; i < index; i++) {
                    if (targetObj[targetKey][i] === undefined) {
                        targetObj[targetKey][i] = '';
                    }
                }

                targetObj[targetKey][index] = url;
            } else {
                targetObj[targetKey] = url;
            }
        });
    };
    reader.readAsDataURL(file);
}