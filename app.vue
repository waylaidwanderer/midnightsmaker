<template>
    <div>
        <Head>
            <Title>Midnights Maker</Title>
            <Meta property="og:title" content="Midnights Maker"/>
            <Meta name="twitter:title" content="Midnights Maker"/>
            <Meta name="description" content="Create your own Midnights-style album cover."/>
            <Meta property="og:description" content="Create your own Midnights-style album cover."/>
            <Meta name="twitter:description" content="Create your own Midnights-style album cover."/>
            <Meta property="og:image" content="https://midnightsmaker.com/meta_image.jpg"/>
            <Meta property="twitter:image" content="https://midnightsmaker.com/meta_image.jpg"/>
            <!-- Favicon -->
            <Link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
            <Link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
            <Link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
            <Link rel="manifest" href="/site.webmanifest"/>
            <Link rel="mask-icon" href="/safari-pinned-tab.svg" color="#62869a"/>
            <Meta name="msapplication-TileColor" content="#e9e8e4"/>
            <Meta name="theme-color" content="#e9e8e4"/>
        </Head>
        <div class="text-center">
            <h1 class="pt-3 text-2xl font-bold">Midnights Maker</h1>
            <h3 class="text-lg font-light">Create your own Midnights-style album cover</h3>
        </div>
        <div class="flex flex-col md:flex-row justify-center items-center md:items-start w-full h-full mt-5">
            <div class="flex flex-col justify-center items-center">
                <canvas
                    ref="albumCoverCanvas"
                    width="1000"
                    height="1000"
                    class="block max-w-[800px] w-full px-3 lg:pl-0"
                >Your browser does not support this feature. Please try the latest version of Chrome, Edge, or Firefox.</canvas>
                <div class="flex flex-row justify-center items-center mt-3">
                    <button
                        v-if="supportsClipboardApi"
                        type="button"
                        class="inline-block mr-2 px-6 py-2 border-2 border-gray-800 text-gray-800 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out flex align-center"
                        @click="copyToClipboard"
                    >
                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="clipboard"
                             class="w-3 mr-1" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path
                                d="M384 112v352c0 26.51-21.49 48-48 48H48c-26.51 0-48-21.49-48-48V112c0-26.51 21.49-48 48-48h80c0-35.29 28.71-64 64-64s64 28.71 64 64h80c26.51 0 48 21.49 48 48zM192 40c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24-10.745-24-24-24m96 114v-20a6 6 0 0 0-6-6H102a6 6 0 0 0-6 6v20a6 6 0 0 0 6 6h180a6 6 0 0 0 6-6z"/>
                        </svg>
                        {{ copyToClipboardText }}
                    </button>
                    <button
                        type="button"
                        class="inline-block px-6 py-2 bg-green-600 text-white font-medium text-xs leading-normal uppercase rounded shadow-sm hover:bg-green-700 hover:shadow-md focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out flex align-center"
                        @click="download"
                    >
                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="download"
                             class="w-3 mr-2 pt-[1px]" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path fill="currentColor"
                                  d="M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z">
                            </path>
                        </svg>
                        Download
                    </button>
                </div>
            </div>
            <div class="md:mr-3 mt-5 md:mt-0 mb-5 flex-col">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                    <label class="block">
                        <span class="text-gray-700">Album Title</span>
                        <input
                            type="text"
                            class="text-sm mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                            v-model="albumTitle"
                        >
                    </label>
                    <label class="block">
                        <span class="text-gray-700">Album Image</span>
                        <input
                            type="file"
                            accept="image/x-png,image/gif,image/jpeg,image/webp"
                            class="text-sm mt-1 pr-1 block w-full rounded-md bg-gray-100 border-transparent cursor-pointer
                            focus:border-gray-500 focus:bg-white focus:ring-0 focus:outline-none
                            file:rounded-md file:border file:cursor-pointer file:p-2"
                            @change="onImageChosen"
                        >
                    </label>
                    <div>
                        <label class="block">
                            <span class="text-gray-700">Side A Label</span>
                            <input
                                type="text"
                                class="text-sm mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                                v-model="sideALabel"
                            >
                        </label>
                        <label class="block mt-2 ml-4">
                            <span class="text-gray-700">Track One</span>
                            <input
                                type="text"
                                class="text-sm mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                                v-model="trackOneTitle"
                            >
                        </label>
                        <label class="block mt-2 ml-4">
                            <span class="text-gray-700">Track Two</span>
                            <input
                                type="text"
                                class="text-sm mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                                v-model="trackTwoTitle"
                            >
                        </label>
                        <label class="block mt-2 ml-4">
                            <span class="text-gray-700">Track Three</span>
                            <input
                                type="text"
                                class="text-sm mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                                v-model="trackThreeTitle"
                            >
                        </label>
                        <label class="block mt-2 ml-4">
                            <span class="text-gray-700">Track Four</span>
                            <input
                                type="text"
                                class="text-sm mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                                v-model="trackFourTitle"
                            >
                        </label>
                        <label class="block mt-2 ml-4">
                            <span class="text-gray-700">Track Five</span>
                            <input
                                type="text"
                                class="text-sm mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                                v-model="trackFiveTitle"
                            >
                        </label>
                        <label class="block mt-2 ml-4">
                            <span class="text-gray-700">Track Six</span>
                            <input
                                type="text"
                                class="text-sm mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                                v-model="trackSixTitle"
                            >
                        </label>
                    </div>
                    <div>
                        <label class="block">
                            <span class="text-gray-700">Side B Label</span>
                            <input
                                type="text"
                                class="text-sm mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                                v-model="sideBLabel"
                            >
                        </label>
                        <label class="block mt-2 ml-4">
                            <span class="text-gray-700">Track Seven</span>
                            <input
                                type="text"
                                class="text-sm mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                                v-model="trackSevenTitle"
                            >
                        </label>
                        <label class="block mt-2 ml-4">
                            <span class="text-gray-700">Track Eight</span>
                            <input
                                type="text"
                                class="text-sm mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                                v-model="trackEightTitle"
                            >
                        </label>
                        <label class="block mt-2 ml-4">
                            <span class="text-gray-700">Track Nine</span>
                            <input
                                type="text"
                                class="text-sm mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                                v-model="trackNineTitle"
                            >
                        </label>
                        <label class="block mt-2 ml-4">
                            <span class="text-gray-700">Track Ten</span>
                            <input
                                type="text"
                                class="text-sm mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                                v-model="trackTenTitle"
                            >
                        </label>
                        <label class="block mt-2 ml-4">
                            <span class="text-gray-700">Track Eleven</span>
                            <input
                                type="text"
                                class="text-sm mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                                v-model="trackElevenTitle"
                            >
                        </label>
                        <label class="block mt-2 ml-4">
                            <span class="text-gray-700">Track Twelve</span>
                            <input
                                type="text"
                                class="text-sm mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                                v-model="trackTwelveTitle"
                            >
                        </label>
                        <label class="block mt-2 ml-4">
                            <span class="text-gray-700">Track Thirteen</span>
                            <input
                                type="text"
                                class="text-sm mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                                v-model="trackThirteenTitle"
                            >
                        </label>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex flex-col justify-center items-center mt-10 text-xs text-gray-500">
            <div>Copyright &copy; 2022 <a href="https://github.com/waylaidwanderer" target="_blank" class="underline">waylaidwanderer</a>. All rights reserved.</div>
            <em>Album design and default image belongs to Taylor Swift.</em>
        </div>
    </div>
</template>

<script setup>
// TODO: favicon, darkreader
import debounce from 'lodash.debounce';

const albumCoverCanvas = ref(null);
const supportsClipboardApi = ref(false);
const copyToClipboardText = ref('Copy to Clipboard');
const croppedAlbumImage = ref(null);

const albumTitle = ref('Midnights');
const albumImage = ref('/cover_image.jpg');
const sideALabel = ref('Side A');
const sideBLabel = ref('Side B');
const trackOneTitle = ref('Track One');
const trackTwoTitle = ref('Track Two');
const trackThreeTitle = ref('Track Three');
const trackFourTitle = ref('Track Four');
const trackFiveTitle = ref('Track Five');
const trackSixTitle = ref('Track Six');
const trackSevenTitle = ref('Track Seven');
const trackEightTitle = ref('Track Eight');
const trackNineTitle = ref('Track Nine');
const trackTenTitle = ref('Track Ten');
const trackElevenTitle = ref('Track Eleven');
const trackTwelveTitle = ref('Track Twelve');
const trackThirteenTitle = ref('Track Thirteen');

const debouncedRender = debounce(render, 300);

watch(albumImage, () => {
    croppedAlbumImage.value = null;
});
watch([
    albumTitle,
    albumImage,
    sideALabel,
    sideBLabel,
    trackOneTitle,
    trackTwoTitle,
    trackThreeTitle,
    trackFourTitle,
    trackFiveTitle,
    trackSixTitle,
    trackSevenTitle,
    trackEightTitle,
    trackNineTitle,
    trackTenTitle,
    trackElevenTitle,
    trackTwelveTitle,
    trackThirteenTitle,
], () => {
    debouncedRender();
});

onMounted(async () => {
    window.WebFontConfig = {
        google: {
            families: ['Roboto:300,400,500,700'],
        },
        active: () => render(),
    };

    if (document.getElementsByTagName("html")[0].classList.contains('wf-active')) {
        render();
    } else {
        (function(d) {
            const wf = d.createElement('script'), s = d.scripts[0];
            wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js';
            wf.async = true;
            s.parentNode.insertBefore(wf, s);
        })(document);
    }

    supportsClipboardApi.value = typeof ClipboardItem === 'function';
});

function copyToClipboard() {
    copyToClipboardText.value = 'Copy to Clipboard';
    albumCoverCanvas.value.toBlob(function(blob) {
        const item = new ClipboardItem({ 'image/png': blob });
        navigator.clipboard.write([item]);
        copyToClipboardText.value = 'Copied to Clipboard';
        setTimeout(function() {
            copyToClipboardText.value = 'Copy to Clipboard';
        }, 3000);
    });
}

function download() {
    const canvasImage = albumCoverCanvas.value.toDataURL('image/png').replace("image/png", "image/octet-stream");
    const link = document.createElement('a');
    const fileName = `midnightsmaker-com_${slugify(albumTitle.value || 'midnights')}`.slice(0, 199);
    link.download = `${fileName}.png`;
    link.href = canvasImage;
    link.click();
}

function onImageChosen(e) {
    if (e.target.files.length <= 0) {
        return;
    }
    const reader = new FileReader();
    reader.onload = function(e) {
        albumImage.value = e.target.result;
    };
    reader.readAsDataURL(e.target.files[0]);
}

async function render() {
    const canvas = albumCoverCanvas.value;
    const letterSpacing = canvas.style.letterSpacing;
    const ctx = canvas.getContext('2d');

    // clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // background color
    ctx.fillStyle = '#e9e8e4';
    ctx.fillRect(0,0, canvas.width, canvas.height);

    // watermark
    ctx.fillStyle = 'rgba(98, 134, 154, 0.5)';
    ctx.font = '300 16px Roboto';
    ctx.fillText('made with midnightsmaker.com', 10, 24);

    // album title
    canvas.style.letterSpacing = '-2px';
    ctx.font = '700 78px Roboto';
    // gradient for album title
    const gradient = ctx.createLinearGradient(233, 0, 233 + ctx.measureText(albumTitle.value).width, 0);
    gradient.addColorStop(0,'#536184');
    gradient.addColorStop(0.45, '#62869a');
    gradient.addColorStop(1, '#88a7bb');
    ctx.fillStyle = gradient;
    ctx.fillText(albumTitle.value, 233, 190 / 0.8, 737);

    // restore letterSpacing
    canvas.style.letterSpacing = letterSpacing;

    const sideGradient = [
        { offset: 0, color: '#88a7bb' },
        { offset: 0.12, color: '#62869a' },
        { offset: 1, color: '#536184' },
    ];

    // Side A
    ctx.font = '400 18px Roboto';
    addGradientText(ctx, sideALabel.value, 30, 634, sideGradient);
    textUnderline(ctx, sideALabel.value, 30, 634, 18, sideGradient);

    // A Tracks
    ctx.font = '500 18px Roboto';
    addGradientText(ctx, trackOneTitle.value, 30, 665, sideGradient);
    addGradientText(ctx, trackTwoTitle.value, 30, 665 + 20, sideGradient);
    addGradientText(ctx, trackThreeTitle.value, 30, 665 + 20 * 2, sideGradient);
    addGradientText(ctx, trackFourTitle.value, 30, 665 + 20 * 3, sideGradient);
    addGradientText(ctx, trackFiveTitle.value, 30, 665 + 20 * 4, sideGradient);
    addGradientText(ctx, trackSixTitle.value, 30, 665 + 20 * 5, sideGradient);

    // Side B
    ctx.font = '400 18px Roboto';
    addGradientText(ctx, sideBLabel.value, 30, 813, sideGradient);
    textUnderline(ctx, sideBLabel.value, 30, 813, 18, sideGradient);

    // B Tracks
    ctx.font = '500 18px Roboto';
    addGradientText(ctx, trackSevenTitle.value, 30, 844, sideGradient);
    addGradientText(ctx, trackEightTitle.value, 30, 844 + 20, sideGradient);
    addGradientText(ctx, trackNineTitle.value, 30, 844 + 20 * 2, sideGradient);
    addGradientText(ctx, trackTenTitle.value, 30, 844 + 20 * 3, sideGradient);
    addGradientText(ctx, trackElevenTitle.value, 30, 844 + 20 * 4, sideGradient);
    addGradientText(ctx, trackTwelveTitle.value, 30, 844 + 20 * 5, sideGradient);
    addGradientText(ctx, trackThirteenTitle.value, 30, 844 + 20 * 6, sideGradient);

    // album image
    if (!croppedAlbumImage.value) {
        croppedAlbumImage.value = (await crop(albumImage.value, 767 / 727)).toDataURL();
        console.log('got to here');
    }
    const coverImage = new Image();
    coverImage.onload = () => {
        const imageWidth = 767;
        const imageHeight = 727;
        ctx.drawImage(coverImage, 0, 0, coverImage.width, coverImage.height, 233 + 4, 274, imageWidth, imageHeight);
    };
    coverImage.src = croppedAlbumImage.value;
}

function addGradientText(ctx, text, x, y, gradientStops, maxWidth) {
    const gradient = ctx.createLinearGradient(x, 0, x + ctx.measureText(text).width, 0);
    gradientStops.forEach(stop => gradient.addColorStop(stop.offset, stop.color));
    // Fill with gradient
    ctx.fillStyle = gradient;
    ctx.fillText(text, x, y, maxWidth);
}

function textUnderline(context, text, x, y, textSize, gradientStops) {
    const textWidth = context.measureText(text).width;
    let startX;
    const startY = y + (textSize / 15) + 2;
    let endX;
    const endY = startY;
    const underlineHeight = 1.5;

    context.beginPath();
    startX = x;
    endX = x + textWidth + 1;

    const gradient = context.createLinearGradient(x, 0, x + textWidth, 0);
    gradientStops.forEach(stop => gradient.addColorStop(stop.offset, stop.color));
    context.strokeStyle = gradient;
    // noinspection JSSuspiciousNameCombination
    context.lineWidth = underlineHeight;
    context.moveTo(startX, startY);
    context.lineTo(endX, endY);
    context.stroke();
}

/**
 * https://pqina.nl/blog/cropping-images-to-an-aspect-ratio-with-javascript/
 * @param {string} url - The source image
 * @param {number} aspectRatio - The aspect ratio
 * @return {Promise<HTMLCanvasElement>} A Promise that resolves with the resulting image as a canvas element
 */
function crop(url, aspectRatio) {
    // we return a Promise that gets resolved with our canvas element
    return new Promise((resolve) => {
        // this image will hold our source image data
        const inputImage = new Image();

        // we want to wait for our image to load
        inputImage.onload = () => {
            // let's store the width and height of our image
            const inputWidth = inputImage.naturalWidth;
            const inputHeight = inputImage.naturalHeight;

            // get the aspect ratio of the input image
            const inputImageAspectRatio = inputWidth / inputHeight;

            // if it's bigger than our target aspect ratio
            let outputWidth = inputWidth;
            let outputHeight = inputHeight;
            if (inputImageAspectRatio > aspectRatio) {
                outputWidth = inputHeight * aspectRatio;
            } else if (inputImageAspectRatio < aspectRatio) {
                outputHeight = inputWidth / aspectRatio;
            }

            // calculate the position to draw the image at
            const outputX = (outputWidth - inputWidth) * 0.5;
            const outputY = (outputHeight - inputHeight) * 0.5;

            // create a canvas that will present the output image
            const outputImage = document.createElement('canvas');

            // set it to the same size as the image
            outputImage.width = outputWidth;
            outputImage.height = outputHeight;

            // draw our image at position 0, 0 on the canvas
            const ctx = outputImage.getContext('2d');
            ctx.drawImage(inputImage, outputX, outputY);
            resolve(outputImage);
        };

        // start loading our image
        inputImage.src = url;
    });
}

/**
 * https://lucidar.me/en/web-dev/how-to-slugify-a-string-in-javascript/
 * @param str
 * @returns {string}
 */
function slugify(str) {
    str = str.replace(/^\s+|\s+$/g, '');

    // Make the string lowercase
    str = str.toLowerCase();

    // Remove accents, swap ñ for n, etc
    const from = 'ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆÍÌÎÏŇÑÓÖÒÔÕØŘŔŠŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇíìîïňñóöòôõøðřŕšťúůüùûýÿžþÞĐđßÆa·/_,:;';
    const to = 'AAAAAACCCDEEEEEEEEIIIINNOOOOOORRSTUUUUUYYZaaaaaacccdeeeeeeeeiiiinnooooooorrstuuuuuyyzbBDdBAa------';
    for (let i = 0, l = from.length; i < l; i++) {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    // Remove invalid chars
    str = str.replace(/[^a-z0-9 -]/g, '')
        // Collapse whitespace and replace by -
        .replace(/\s+/g, '-')
        // Collapse dashes
        .replace(/-+/g, '-');

    return str;
}
</script>

<style>
html {
    font-family: 'Roboto', sans-serif;
}
</style>
