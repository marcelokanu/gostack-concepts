import React, {useState, useEffect} from 'react';
import { TouchableOpacity, SafeAreaView, FlatList, Text, StyleSheet, StatusBar } from 'react-native' //igual div do html

import api from './services/api';


export default function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('projects').then(response => {
      setProjects(response.data);
      console.log(response.data);
    });
  }, []);

  async function handleAddProject() {
    const response = await api.post('projects', {
      title: `Novo projeto ${Date.now()}`,
      owner: "Marcelo Bonilla"
    });

    const project = response.data;
    setProjects([...projects, project]);
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor ='#7159c1' translucent = {false}/>
      <SafeAreaView style={styles.container}>
      
        <FlatList 
          data={projects}
          keyExtractor={project => project.id}
          renderItem={({item: project}) => (
            <Text style={styles.project}>{project.title}</Text>
          )}
        />

        <TouchableOpacity 
          onPress={handleAddProject} 
          activeOpacity={0.6} 
          style={styles.button}
        >
          <Text style={styles.buttonText}>Adicionar Projeto</Text>
        </TouchableOpacity>
      </SafeAreaView>
    
      
      {/* -- Visualização sem scroll, não recomendado para listas.
      <View style={styles.container}>
        {projects.map(project => (
          <Text style={styles.project} key={project.id}>{project.title}</Text>
        ))}
      </View> */}
    </>
  )};

const styles = StyleSheet.create( {
  container: {
    backgroundColor: '#7159c1',
    flex: 1,
  },
  project: {
    color: '#FFF',
    fontSize: 30
  },
  button: {
    backgroundColor: '#FFF',
    margin:20,
    height:50,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center' 
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
  }
});