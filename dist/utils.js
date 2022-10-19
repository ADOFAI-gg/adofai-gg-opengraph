import path from 'path';
import { fileURLToPath } from 'url';
import { readFile } from 'fs/promises';
import 'dotenv/config';
import Axios from 'axios';
export const resourcesDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '../resources');
export const fontsDir = path.join(resourcesDir, 'fonts');
export const api = Axios.create({
    baseURL: process.env.API_ENDPOINT + '/api/v1',
});
export const fonts = [
    {
        name: 'Quicksand',
        data: await readFile(path.join(fontsDir, 'Quicksand', 'Quicksand-Light.ttf')),
        style: 'normal',
        weight: 300,
    },
    {
        name: 'Quicksand',
        data: await readFile(path.join(fontsDir, 'Quicksand', 'Quicksand-Regular.ttf')),
        style: 'normal',
        weight: 400,
    },
    {
        name: 'Quicksand',
        data: await readFile(path.join(fontsDir, 'Quicksand', 'Quicksand-Medium.ttf')),
        style: 'normal',
        weight: 500,
    },
];
const youtubeIdRegex = /^.*(?:youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#&?]*).*/;
export const getYoutubeVideoId = (url) => youtubeIdRegex.exec(url)?.[1] ?? '';
