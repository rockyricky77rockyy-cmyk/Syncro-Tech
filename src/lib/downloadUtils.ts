// Download counter utility using localStorage

const DOWNLOADS_KEY = 'app_downloads';

interface DownloadCounts {
    [appId: string]: number;
}

// Get all download counts from localStorage
export const getDownloadCounts = (): DownloadCounts => {
    try {
        const stored = localStorage.getItem(DOWNLOADS_KEY);
        return stored ? JSON.parse(stored) : {};
    } catch {
        return {};
    }
};

// Get download count for a specific app
export const getAppDownloads = (appId: string, initialCount: string): string => {
    const counts = getDownloadCounts();
    const storedCount = counts[appId] || 0;
    const initial = parseInt(initialCount) || 0;
    const total = initial + storedCount;

    // Format the number
    if (total >= 1000000) {
        return `${(total / 1000000).toFixed(1)}M`;
    } else if (total >= 1000) {
        return `${(total / 1000).toFixed(1)}K`;
    }
    return total.toString();
};

// Increment download count for an app
export const incrementDownload = (appId: string): void => {
    const counts = getDownloadCounts();
    counts[appId] = (counts[appId] || 0) + 1;

    try {
        localStorage.setItem(DOWNLOADS_KEY, JSON.stringify(counts));
    } catch (error) {
        console.error('Failed to save download count:', error);
    }
};

// Share functionality
export const shareApp = async (appName: string, appDescription: string, url?: string): Promise<void> => {
    const shareData = {
        title: appName,
        text: appDescription,
        url: url || window.location.href,
    };

    try {
        if (navigator.share) {
            await navigator.share(shareData);
        } else {
            // Fallback: copy to clipboard
            await navigator.clipboard.writeText(`${appName}\n${appDescription}\n${shareData.url}`);
            alert('Link copied to clipboard!');
        }
    } catch (error) {
        if (error instanceof Error && error.name !== 'AbortError') {
            console.error('Error sharing:', error);
            // Fallback: copy to clipboard
            try {
                await navigator.clipboard.writeText(`${appName}\n${appDescription}\n${shareData.url}`);
                alert('Link copied to clipboard!');
            } catch {
                alert('Unable to share. Please copy the URL manually.');
            }
        }
    }
};
