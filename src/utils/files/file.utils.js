import fs from 'fs-extra';
import pathUtils from './path.utils';

class FileUtils {

    constructor() { }

    async read(targetPath) {
        return await fs.readFile(targetPath, 'utf-8');
    }

    createDirectory(targetPath) {
        if (!targetPath) {
            return;
        }
        if (!fs.existsSync(targetPath)) {
            fs.mkdirSync(targetPath, { recursive: true });
        }
    }

    async isPathExists(targetPath) {
        // Check if the path parameter was received.
        if (!targetPath) {
            throw new Error(`targetPath not received: ${targetPath} (1000028)`);
        }
        // Check if the path parameter exists.
        try {
            return await fs.stat(targetPath);
        }
        catch (error) {
            return false;
        }
    }

    async removeDirectoryIfExists(targetPath) {
        if (await this.isPathExists(targetPath)) {
            await fs.remove(targetPath);
        }
    }

    async createDirectoryIfNotExists(targetPath) {
        if (!await this.isPathExists(targetPath)) {
            await fs.mkdir(targetPath);
        }
    }

    async copyDirectory(sourcePath, targetPath, filterFunction) {
        await fs.copy(sourcePath, targetPath, { filter: filterFunction });
    }

    isFilePath(targetPath) {
        const stats = fs.statSync(targetPath);
        return stats.isFile();
    }

    isDirectoryPath(targetPath) {
        const stats = fs.statSync(targetPath);
        return stats.isDirectory();
    }

    async removeFile(targetPath) {
        if (await this.isPathExists(targetPath)) {
            await fs.unlink(targetPath);
        }
    }

    async appendFile(data) {
        const { targetPath, message } = data;
        if (!targetPath) {
            throw new Error(`targetPath not found: ${targetPath} (1000029)`);
        }
        if (!message) {
            throw new Error(`message not found: ${message} (1000030)`);
        }
        if (!await this.isPathExists(targetPath)) {
            await fs.promises.mkdir(pathUtils.getDirectoryPath(targetPath), { recursive: true }).catch(console.error);
        }
        // Append the message to the file.
        await fs.appendFile(targetPath, message);
    }
}

export default new FileUtils();