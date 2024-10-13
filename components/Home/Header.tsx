import { View, Text , Image} from 'react-native'
import React, { useContext } from 'react'
import { Colors } from '@/constants/Colors'
import { useUser } from '@clerk/clerk-expo'
import { UserDetailContext } from '@/context/UserDetailContext'

export default function Header() {
    const {user} = useUser()
    const {userDetail, setUserDetail} = useContext(UserDetailContext)
  return (
    <View>
      <Text style={{fontSize: 25, color: Colors.DARK_BLUE, fontWeight: '800'}}>Imagin AI</Text>

      <View >
        <Image source={require('@/assets/images/coin.jpeg')} style={{width: 30, height: 30, borderRadius: 99}}/>
        <Text style={{color: Colors.GRAY}}>{userDetail?.credits}</Text>
        <Image source={{uri:user?.imageUrl}} style={{width: 40, height: 40, borderRadius: 99}}/>
      </View>
    </View>
  )
}