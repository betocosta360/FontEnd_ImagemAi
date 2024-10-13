import { Tabs } from 'expo-router';
import React, { useContext, useEffect } from 'react';

import { Colors } from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useUser } from '@clerk/clerk-expo'
import GlobalApi from '@/service/GlobalApi';
import { UserDetailContext } from '@/context/UserDetailContext';


export default function TabLayout() {

  const { user } = useUser()
  const { userDetail, setUserDetail } = useContext(UserDetailContext)

  useEffect(() => {
    user && VerifyUser()
  }, [user])

  const VerifyUser = async () => {
    const result = await GlobalApi.GetUserInfo(user?.primaryEmailAddress?.emailAddress)

    if (result.data.data.length != 0) {
      setUserDetail(result.data.data[0])

      return
    } try {
      const data = {
        userEmail: user?.primaryEmailAddress?.emailAddress,
        userName: user?.fullName,
      }
      const result = await GlobalApi.CreateNewUser(data)
      setUserDetail(result.data.data)
      console.log(result?.data.data)
    } catch (e) { }
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarInactiveTintColor: Colors.GRAY,
      }}>
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          tabBarLabel: 'home',
          tabBarActiveTintColor: Colors.DARK_BLUE,
          tabBarIcon: ({ color }) => <Ionicons name="home" size={28} color={color} />
        }}
      />
      <Tabs.Screen
        name="collection"
        options={{
          headerShown: false,
          tabBarLabel: 'Coleções',
          tabBarActiveTintColor: Colors.DARK_BLUE,
          tabBarIcon: ({ color }) => <Ionicons name="folder-open" size={28} color={color} />
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          tabBarLabel: 'Perfil',
          tabBarActiveTintColor: Colors.DARK_BLUE,
          tabBarIcon: ({ color }) => <Ionicons name="person" size={28} color={color} />
        }}
      />

    </Tabs>
  );
}
