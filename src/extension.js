import Meta from 'gi://Meta';

function lastWSIndex() { return global.workspace_manager.n_workspaces - 1 }

function indexDown(activeWorkspaceIndex) {
	if ( activeWorkspaceIndex < lastWSIndex() ) {
		return activeWorkspaceIndex + 1;
	}
	return 0;
}

function indexUp(activeWorkspaceIndex) {
	if (activeWorkspaceIndex > 0) {
		return activeWorkspaceIndex - 1;
	}
	return lastWSIndex();
}

function get_neighbor(direction) {
	var index = this.index();
	if(direction === Meta.MotionDirection.UP || direction === Meta.MotionDirection.LEFT) {
		index = indexUp(index);
	} else {
		index = indexDown(index);
	}
	return global.workspace_manager.get_workspace_by_index(index);
}

let old = {};

export default class WorkspaceSwitchWraparound {
	enable() {
		old = Meta.Workspace.prototype.get_neighbor;
		Meta.Workspace.prototype.get_neighbor = get_neighbor;
	}

	disable() {
		Meta.Workspace.prototype.get_neighbor = old;
	}
}
