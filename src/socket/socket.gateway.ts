// socket.gateway.ts
import {
	WebSocketGateway,
	WebSocketServer,
	OnGatewayConnection,
	OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
	@WebSocketServer() server: Server;

	handleConnection(client: Socket) {
		console.log(`Cliente ${client.id} se ha conectado.`);

		client.join('envios');
	}

	handleDisconnect(client: Socket) {
		console.log(`Cliente ${client.id} se ha desconectado.`);
	}

	emitContainerSelection(containers: string[]) {
		this.server.to('envios').emit('contenedoresSeleccionados', containers);
	}

	emitStatsUpdate(stats: any) {
		this.server.emit('estadisticasActualizadas', stats);
	}
}
