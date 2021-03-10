import { app, dialog } from 'electron';

const unexpectedReasons = [
    // 'crashed', // Process simply crashed (commentted out for now, need to test)
    'oom', // Out of memory
    'launch-failure', // Process couldn't launch
];

const init = ({ mainWindow }: Dependencies) => {
    // Check if the renderer process got unexpectedly terminated
    mainWindow.webContents.on('render-process-gone', (_, { reason }) => {
        if (unexpectedReasons.includes(reason)) {
            // Note: No need to log this, the event logger already takes care of that
            const result = dialog.showMessageBoxSync(mainWindow, {
                type: 'error',
                message: `Render process terminated unexpectedly (reason: ${reason}).`,
                buttons: ['Quit', 'Restart'],
            });

            // Restart
            if (result === 1) {
                app.relaunch();
            }

            app.exit();
        }
    });
};

export default init;
