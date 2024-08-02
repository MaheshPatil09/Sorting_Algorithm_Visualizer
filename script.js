const ctx = document.getElementById('chart').getContext('2d');
let chart;
let data = Array.from({ length: 30 }, () => Math.floor(Math.random() * 100));

function createChart(data) {
    if (chart) chart.destroy();
    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.map((_, i) => i + 1),
            datasets: [{
                label: 'Array Elements',
                data: data,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                x: { beginAtZero: true },
                y: { beginAtZero: true }
            }
        }
    });
}

async function bubbleSort() {
    let arr = [...data];
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                createChart(arr);
                await delay(500); // Adjust the delay for speed of visualization
            }
        }
    }
    createChart(arr);
}

async function insertionSort() {
    let arr = [...data];
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    for (let i = 1; i < arr.length; i++) {
        let key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
        createChart(arr);
        await delay(500); // Adjust the delay for speed of visualization
    }
    createChart(arr);
}

async function mergeSort(arr) {
    if (arr.length <= 1) return arr;
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    
    const merge = async (left, right) => {
        let result = [];
        while (left.length && right.length) {
            if (left[0] <= right[0]) result.push(left.shift());
            else result.push(right.shift());
            createChart([...result, ...left, ...right]);
            await delay(500); // Adjust the delay for speed of visualization
        }
        return result.concat(left, right);
    };
    
    const divide = async (arr) => {
        if (arr.length <= 1) return arr;
        const mid = Math.floor(arr.length / 2);
        const left = arr.slice(0, mid);
        const right = arr.slice(mid);
        
        const sortedLeft = await divide(left);
        const sortedRight = await divide(right);
        
        return merge(sortedLeft, sortedRight);
    };
    
    const sortedArray = await divide(arr);
    createChart(sortedArray);
}

async function quickSort(arr, low = 0, high = arr.length - 1) {
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    
    const partition = async (low, high) => {
        const pivot = arr[high];
        let i = low - 1;
        for (let j = low; j < high; j++) {
            if (arr[j] < pivot) {
                i++;
                [arr[i], arr[j]] = [arr[j], arr[i]];
                createChart(arr);
                await delay(500); // Adjust the delay for speed of visualization
            }
        }
        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
        createChart(arr);
        await delay(500); // Adjust the delay for speed of visualization
        return i + 1;
    };
    
    if (low < high) {
        const pi = await partition(low, high);
        await quickSort(arr, low, pi - 1);
        await quickSort(arr, pi + 1, high);
    }
    createChart(arr);
}

document.getElementById('start').addEventListener('click', async () => {
    const algorithm = document.getElementById('algorithm').value;
    switch (algorithm) {
        case 'bubbleSort':
            await bubbleSort();
            break;
        case 'insertionSort':
            await insertionSort();
            break;
        case 'mergeSort':
            await mergeSort([...data]);
            break;
        case 'quickSort':
            await quickSort([...data]);
            break;
        default:
            console.error('Unknown algorithm');
    }
});

document.getElementById('reset').addEventListener('click', () => {
    data = Array.from({ length: 30 }, () => Math.floor(Math.random() * 100));
    createChart(data);
});
    
// Initial chart
createChart(data);
