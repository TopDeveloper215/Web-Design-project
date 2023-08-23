import numpy as np
import open3d as o3d
import pandas as pd
import matplotlib.pyplot as plt

from sklearn.cluster import DBSCAN
import hdbscan

pointcloudfile = "input.ply"
pcd = o3d.io.read_point_cloud(pointcloudfile)
hdbscan = False

def downsample(point_cloud, voxel_size=0.02):
    point_cloud = point_cloud.voxel_down_sample(voxel_size=voxel_size)
    print(f"POINT CLOUD POINTS {point_cloud}")
    points = np.asarray(point_cloud.points)
    colors = np.asarray(point_cloud.colors)
    normals = np.asarray(point_cloud.normals)
    return points, colors, normals


def visualizer():
    vis = o3d.visualization.Visualizer()
    vis.create_window(window_name="3D view of datapoint", width=1280, height=960)
    opt = vis.get_render_option()
    opt.background_color = np.asarray([0, 0, 0])

    vis.add_geometry(point_cloud)
    mesh_frame = o3d.geometry.TriangleMesh.create_coordinate_frame(size=0.6, origin=(-1,-1,-1))
    vis.add_geometry(mesh_frame)
    vis.run()
    vis.destroy_window()
    
points, colors, normals = downsample(pcd)
p_data = pd.DataFrame(points,columns=["x","y","z"])
n_data = pd.DataFrame(normals,columns=["nx","ny","nz"])
c_data = pd.DataFrame(colors,columns=["red","green","blue"])

df = pd.concat([p_data,c_data,n_data],axis=1)

df.head()

x = df.iloc[:,:3]
def train_data_with_dbscan(x):
    db = DBSCAN(eps=0.3, min_samples=10)
    db.fit(x)
    lb = db.labels_
    cor_samples = db.core_sample_indices_
    return lb,cor_samples

def train_data_with_hdbscan(x):
    db = hdbscan.HDBSCAN(min_cluster_size=5, min_samples=10, metric='euclidean')
    db.fit(x)
    lb = db.labels_
    cor_samples = db.core_sample_indices_ # Something problem here
    return lb,cor_samples
  
if hdbscan == False:
	labels,cor_samples = train_data_with_dbscan(x)
else:
  labels,cor_samples = train_data_with_hdbscan(x)
core_samples_mask = np.zeros_like(labels, dtype=bool)
core_samples_mask[cor_samples] = True
n_clusters_ = len(set(labels)) - (1 if -1 in labels else 0)

unique_labels = set(labels)
cor = colors = ['r',"g","b"]


# 2D view
plt.figure(figsize=(20,12))
for k, col in zip(unique_labels, colors):
    if k == -1:
        # Black used for noise.
        col = 'k'
  
    class_member_mask = (labels == k)
  
    xy = x[class_member_mask & core_samples_mask]
    plt.plot(xy.iloc[:, 0], xy.iloc[:, 1], 'o', markerfacecolor=col,
             markeredgecolor='k',
             markersize=6)
  
    xy = x[class_member_mask & ~core_samples_mask]
    plt.plot(xy.iloc[:, 0], xy.iloc[:, 1], 'o', markerfacecolor=col,
             markeredgecolor='k',
             markersize=6)
    
    plt.xticks([])
    plt.yticks([])

plt.title('2D view of data and number of clusters: %d' % n_clusters_)
plt.show()

l =[]
for i in labels:
    if i == -1:
        l.append(1)
    else:
        l.append(0)
        
df["outlier"] = l

result = df[df["outlier"]==0].drop(columns=["outlier"],axis=1)

result.head()

p = np.array(result.iloc[:,:3])
c = np.array(result.iloc[:,3:6])
n = np.array(result.iloc[:,6:9])

point_cloud = o3d.geometry.PointCloud()
point_cloud.points = o3d.utility.Vector3dVector(p)
point_cloud.colors = o3d.utility.Vector3dVector(c)
point_cloud.normals = o3d.utility.Vector3dVector(n)

visualizer()