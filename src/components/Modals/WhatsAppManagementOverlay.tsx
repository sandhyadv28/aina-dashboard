import { ChevronDown, Clock, MessageSquare, Trash2, UserPlus, Users, X } from "lucide-react";
import { useState } from "react";
import { Button } from "../SharedComponents/button";
import { Card, CardContent, CardHeader, CardTitle } from "../SharedComponents/card";
import { Input } from "../SharedComponents/input";
import { Label } from "../SharedComponents/label";

interface WhatsAppUser {
  id: string;
  name: string;
  phone: string;
  role: string;
  timeFrom: string;
  timeTo: string;
}

interface WhatsAppManagementOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  users: WhatsAppUser[];
  onAddUser: (user: Omit<WhatsAppUser, 'id'>) => void;
  onRemoveUser: (id: string) => void;
}

export const WhatsAppManagementOverlay = ({
  isOpen,
  onClose,
  users,
  onAddUser,
  onRemoveUser
}: WhatsAppManagementOverlayProps) => {
  const [showAddUser, setShowAddUser] = useState(false);
  const [newUserName, setNewUserName] = useState("");
  const [newUserPhone, setNewUserPhone] = useState("");
  const [newUserRole, setNewUserRole] = useState("");
  const [newUserTimeFrom, setNewUserTimeFrom] = useState("08:00");
  const [newUserTimeTo, setNewUserTimeTo] = useState("18:00");
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);

  const roleOptions = [
    { value: "attending", label: "Attending Physician" },
    { value: "resident", label: "Resident Doctor" },
    { value: "nurse", label: "Registered Nurse" },
    { value: "charge-nurse", label: "Charge Nurse" },
    { value: "nurse-manager", label: "Nurse Manager" },
    { value: "administrator", label: "Administrator" },
    { value: "supervisor", label: "Supervisor" }
  ];

  const handleAddUser = () => {
    if (newUserName && newUserPhone && newUserRole && newUserTimeFrom && newUserTimeTo) {
      onAddUser({
        name: newUserName,
        phone: newUserPhone,
        role: newUserRole,
        timeFrom: newUserTimeFrom,
        timeTo: newUserTimeTo
      });
      setNewUserName("");
      setNewUserPhone("");
      setNewUserRole("");
      setNewUserTimeFrom("08:00");
      setNewUserTimeTo("18:00");
      setShowAddUser(false);
    }
  };

  const formatTimeRange = (from: string, to: string) => {
    return `${from} - ${to}`;
  };

  const handleRoleSelect = (role: string) => {
    setNewUserRole(role);
    setShowRoleDropdown(false);
  };

  const getSelectedRoleLabel = () => {
    const selectedRole = roleOptions.find(role => role.value === newUserRole);
    return selectedRole ? selectedRole.label : "Select role";
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative z-50 w-full max-w-4xl max-h-[85vh] overflow-y-auto custom-scrollbar">
        <div className="glass-card w-full">
          <div className="p-6">
            <div className="flex items-center justify-between pb-4">
              <div className="flex items-center space-x-2">
                <MessageSquare className="w-5 h-5 text-green-500" />
                <h2 className="text-lg font-semibold leading-none tracking-tight">WhatsApp Notification Management</h2>
              </div>
              <button
                onClick={onClose}
                className="p-1 text-muted-foreground hover:text-foreground rounded-sm hover:bg-accent"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Current Users */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Users className="w-6 h-6 text-primary" />
                      <span>Notification Recipients</span>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => setShowAddUser(true)}
                      className="btn-medical-primary"
                    >
                      <UserPlus className="w-5 h-5 mr-2" />
                      Add User
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {users.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No users configured for WhatsApp notifications</p>
                      <p className="text-sm mt-1">Add users to start receiving alerts</p>
                    </div>
                  ) : (
                    users.map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-4 bg-background/50 rounded-lg border border-border/50">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <div className="font-medium text-sm">{user.name}</div>
                            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                              {user.role}
                            </span>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {user.phone}
                          </div>
                          <div className="flex items-center space-x-1 text-xs text-muted-foreground mt-1">
                            <Clock className="w-4 h-4" />
                            <span>Alert hours: {formatTimeRange(user.timeFrom, user.timeTo)}</span>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onRemoveUser(user.id)}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="w-5 h-5" />
                        </Button>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>

              {showAddUser && (
                <Card className="glass-card border-primary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-primary">
                      <UserPlus className="w-5 h-5" />
                      <span>Add New User</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          placeholder="Enter full name"
                          value={newUserName}
                          onChange={(e) => setNewUserName(e.target.value)}
                          className="clinical-input"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Mobile Number</Label>
                        <Input
                          id="phone"
                          placeholder="+1 (555) 123-4567"
                          value={newUserPhone}
                          onChange={(e) => setNewUserPhone(e.target.value)}
                          className="clinical-input"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="role">Role</Label>
                        <div className="relative">
                          <div
                            className="clinical-input flex items-center justify-between cursor-pointer"
                            onClick={() => setShowRoleDropdown(!showRoleDropdown)}
                          >
                            <p className={newUserRole ? "text-foreground" : "text-muted-foreground"}>
                              {getSelectedRoleLabel()}
                            </p>
                            <ChevronDown className="w-4 h-4 text-muted-foreground" />
                          </div>
                          {showRoleDropdown && (
                            <div className="absolute z-10 w-full mt-1 bg-background border border-border rounded-md shadow-lg">
                              {roleOptions.map((role) => (
                                <div
                                  key={role.value}
                                  className="px-3 py-2 hover:bg-accent cursor-pointer first:rounded-t-md last:rounded-b-md"
                                  onClick={() => handleRoleSelect(role.value)}
                                >
                                  <p className="text-sm">{role.label}</p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="timeFrom">Alert Start Time</Label>
                        <Input
                          id="timeFrom"
                          type="time"
                          value={newUserTimeFrom}
                          onChange={(e) => setNewUserTimeFrom(e.target.value)}
                          className="clinical-input"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="timeTo">Alert End Time</Label>
                        <Input
                          id="timeTo"
                          type="time"
                          value={newUserTimeTo}
                          onChange={(e) => setNewUserTimeTo(e.target.value)}
                          className="clinical-input"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end space-x-3 pt-4">
                      <Button
                        variant="ghost"
                        onClick={() => {
                          setShowAddUser(false);
                          setNewUserName("");
                          setNewUserPhone("");
                          setNewUserRole("");
                          setNewUserTimeFrom("08:00");
                          setNewUserTimeTo("18:00");
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleAddUser}
                        className="btn-medical-primary"
                        disabled={!newUserName || !newUserPhone || !newUserRole || !newUserTimeFrom || !newUserTimeTo}
                      >
                        Add User
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};