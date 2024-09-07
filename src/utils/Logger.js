// src/utils/Logger.js

const getFunctionName = () =>
{
    let functionLine, match;

    const stack = new Error().stack;
    if ( !stack ) return 'UnknownFunction';

    // Extract the function name from the stack trace
    const stackLines = stack.split( '\n' );
    // The function name is typically on the third line of the stack trace
    functionLine = stackLines[2] || '';

    // Regular expression to extract function name
    match = functionLine.match( /at\s+(\w+)\s*\(/ );

    if ( match && 'Object.info' !== match && undefined !== match )
    {
        return "<" + match[1] + ">";
    }

    functionLine = stackLines[3] || '';

    // Regular expression to extract function name
    match = functionLine.match( /at\s+(\w+)\s*\(/ );

    if ( match )
    {
        return "<" + match[1] + ">";
    }

    return "<>";
};

const Logger = {
    log: ( ...args ) => console.log( '[LOG]', getFunctionName(), ...args ),
    warn: ( ...args ) => console.warn( '[WARN]', getFunctionName(), ...args ),
    error: ( ...args ) => console.error( '[ERROR]', getFunctionName(), ...args ),
    info: ( ...args ) => console.info( '[INFO]', getFunctionName(), ...args ),
    debug: ( ...args ) => console.debug( '[DEBUG]', getFunctionName(), ...args ),
};

export default Logger;
