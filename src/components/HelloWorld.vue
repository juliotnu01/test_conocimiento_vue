<template>
<v-container>
    <v-row class="text-center">
        <v-col cols="12">
            <v-card>
                <v-card-title primary-title>
                    TODO LIST (Lista de tareas)
                </v-card-title>
                <v-container>
                    <v-row>
                        <v-col cols="12" xs="12" sm="12" md="6" lg="6">
                            <v-text-field label="Ingrese Tarea" v-model="tarea_.tarea" />
                        </v-col>
                        <v-col cols="12" xs="12" sm="12" md="6" lg="6">
                            <v-btn block color="warning" dark @click="editarTarea(tarea_)" v-if="tarea_.edit">Editar Tarea</v-btn>
                            <v-btn block color="success" dark @click="addTareas" v-else>Agregar Tarea</v-btn>
                        </v-col>
                        <v-col cols="12" xs="12" sm="12" md="12" lg="12">
                            <v-data-table :headers="headers" :items="tareas" hide-default-footer class="elevation-1">
                                <template v-slot:item.accion="{item}">
                                    <td>
                                        <v-btn color="warning" icon @click="editTarea(item)">
                                            <v-icon>mdi-pencil</v-icon>
                                        </v-btn>
                                        <v-btn color="error" icon @click="eliminarTarea(item)">
                                            <v-icon>mdi-delete</v-icon>
                                        </v-btn>
                                        <v-btn color="success" icon @click="checkTara(item)">
                                            <v-icon>mdi-check</v-icon>
                                        </v-btn>
                                    </td>
                                </template>
                                <template v-slot:item.tarea="{item}">
                                    <td>
                                        <v-alert color="success" v-if="item.completada">
                                            <v-icon>mdi-check</v-icon>
                                        </v-alert>
                                        {{item}}
                                    </td>
                                </template>
                            </v-data-table>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card>
        </v-col>
    </v-row>
</v-container>
</template>

<script>
import {
    mapGetters
} from 'vuex'
export default {
    name: 'TodoList',

    data: () => ({
        headers: [{
                text: 'Tareas',
                sortable: true,
                value: 'tarea'
            },
            {
                text: 'Accion',
                sortable: true,
                value: 'accion'
            }
        ],
    }),
    computed: {
        ...mapGetters(['tareas', 'tarea']),
        tarea_: {
            get() {
                return this.tarea
            },
            set(val) {
                this.$store.commit('setTarea', val)
            }
        }
    },
    methods: {
        addTareas() {
            try {
                this.$store.commit('setTareas', this.tarea_)
                this.tarea_ = {
                    tarea: '',
                    completada: false,
                    edit: false,
                }
            } catch (e) {
                console.log(e)
            }
        },
        editTarea(item) {
            try {
                item.edit = true
                this.$store.commit('setTarea', item)
            } catch (e) {
                console.log(e)
            }
        },
        editarTarea(item) {
            this.$store.commit('setTarea', item)
            this.tarea_ = {
                tarea: '',
                completada: false,
                edit: false,
            }
        },
        eliminarTarea(t) {
            var indice = this.tareas.indexOf(t)
            this.tareas.splice(indice, 1);
        },
        checkTara(item) {
            var indice = this.tareas.indexOf(item)
            this.tareas[indice].completada = true
        }

    }
}
</script>
