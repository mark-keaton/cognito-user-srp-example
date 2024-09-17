// index.js
import { Amplify } from "aws-amplify"
import { signIn, fetchAuthSession } from "aws-amplify/auth"

const poolId = "";
const clientId = "";
const username = "";
const password = "";

// Configure Cognito with required details
Amplify.configure({
    Auth: {
        Cognito: {
            userPoolId: poolId,
            userPoolClientId: clientId,
        },
    },
});

const loginUser = async (username: string, password: string) => {

    try {
        // Sign in the user with username and password
        const user = await signIn({
            username,
            password,
            options: {
                authFlowType: "USER_SRP_AUTH"
            }
        });
        console.log('Sign in success:', user);

        // Retrieve current session to get tokens
        const session = await fetchAuthSession();

        // Output tokens to console
        console.log('session:', session);
        console.log(session.tokens?.accessToken.toString());
    } catch (error) {
        console.error('Error during sign in:', error);
    }
};

// Call the loginUser function with your credentials
await loginUser(username, password);
