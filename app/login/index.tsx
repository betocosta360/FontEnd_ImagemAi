import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import * as WebBrowser from 'expo-web-browser'
import { useOAuth } from '@clerk/clerk-expo'
import * as Linking from 'expo-linking'


export default function Login() {

  useWarmUpBrowser()

  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' })

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow({
        redirectUrl: Linking.createURL('/(tabs)/home', { scheme: 'myapp' }),
      })

      if (createdSessionId) {
        //setActive!({ session: createdSessionId })
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error('OAuth error', err)
    }
  }, [])
    return (
        <View>
            <Image source={require('@/assets/images/banner.jpg')}
                style={{
                    width: '100%',
                    height: 600
                }} />
            <View style={styles.loginContainer}>
                <Text style={{fontSize: 25,
                    fontWeight: 'bold',
                    textAlign: 'center',
                }}>ImaginIA</Text>
                <Text style={{fontSize: 20,
                    fontWeight:'400',
                    color: 'gray',
                    textAlign: 'center',
                    marginTop: 10
                }}>Crie sua arte em poucos cliques</Text>

                <TouchableOpacity onPress={onPress} style={styles.button}>
                    <Text style={{color:'white', fontSize: 15, fontWeight: '900'}}>Comece agora!</Text>
                </TouchableOpacity>
                <Text style={{color:'gray', textAlign: 'center', marginTop: 15, fontSize: 13, fontWeight: '600'}}>Para continuar aceite os termos e condições</Text>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    loginContainer: {
        padding: 20,
        marginTop: -20,
        backgroundColor: 'white',
        height: 600,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30
    },
    button:{
        width:'100%',
        padding: 20,
        backgroundColor: 'black',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15
    }
})
export const useWarmUpBrowser = () => {
  React.useEffect(() => {
   
    void WebBrowser.warmUpAsync()
    return () => {
      void WebBrowser.coolDownAsync()
    }
  }, [])
}