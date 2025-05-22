<?php $__env->startSection('container-attrs'); ?>
    component="entity-search"
    option:entity-search:entity-id="<?php echo e($book->id); ?>"
    option:entity-search:entity-type="book"
<?php $__env->stopSection(); ?>

<?php $__env->startPush('social-meta'); ?>
    <meta property="og:description" content="<?php echo e(Str::limit($book->description, 100, '...')); ?>">
    <?php if($book->cover): ?>
        <meta property="og:image" content="<?php echo e($book->getBookCover()); ?>">
    <?php endif; ?>
<?php $__env->stopPush(); ?>

<?php $__env->startSection('body'); ?>

    <div class="mb-s">
        <?php echo $__env->make('entities.breadcrumbs', ['crumbs' => [
            $book,
        ]], \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
    </div>

    <main class="content-wrap card">
        <h1 class="break-text"><?php echo e($book->name); ?></h1>
        <div refs="entity-search@contentView" class="book-content">
            <p class="text-muted"><?php echo nl2br(e($book->description)); ?></p>
            <?php if(count($bookChildren) > 0): ?>
                <div class="entity-list book-contents">
                    <?php $__currentLoopData = $bookChildren; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $childElement): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                        <?php if($childElement->isA('chapter')): ?>
                            <?php echo $__env->make('chapters.parts.list-item', ['chapter' => $childElement], \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
                        <?php else: ?>
                            <?php echo $__env->make('pages.parts.list-item', ['page' => $childElement], \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
                        <?php endif; ?>
                    <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                </div>
            <?php else: ?>
                <div class="mt-xl">
                    <hr>
                    <p class="text-muted italic mb-m mt-xl"><?php echo e(trans('entities.books_empty_contents')); ?></p>

                    <div class="icon-list block inline">
                        <?php if(userCan('page-create', $book)): ?>
                            <a href="<?php echo e($book->getUrl('/create-page')); ?>" class="icon-list-item text-page">
                                <span class="icon"><?php echo icon('page'); ?></span>
                                <span><?php echo e(trans('entities.books_empty_create_page')); ?></span>
                            </a>
                        <?php endif; ?>
                        <?php if(userCan('chapter-create', $book)): ?>
                            <a href="<?php echo e($book->getUrl('/create-chapter')); ?>" class="icon-list-item text-chapter">
                                <span class="icon"><?php echo icon('chapter'); ?></span>
                                <span><?php echo e(trans('entities.books_empty_add_chapter')); ?></span>
                            </a>
                        <?php endif; ?>
                    </div>

                </div>
            <?php endif; ?>
        </div>

        <?php echo $__env->make('entities.search-results', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
    </main>

<?php $__env->stopSection(); ?>

<?php $__env->startSection('right'); ?>
    <div class="mb-xl">
        <h5><?php echo e(trans('common.details')); ?></h5>
        <div class="text-small text-muted blended-links">
            <?php echo $__env->make('entities.meta', ['entity' => $book], \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
            <?php if($book->restricted): ?>
                <div class="active-restriction">
                    <?php if(userCan('restrictions-manage', $book)): ?>
                        <a href="<?php echo e($book->getUrl('/permissions')); ?>"><?php echo icon('lock'); ?><?php echo e(trans('entities.books_permissions_active')); ?></a>
                    <?php else: ?>
                        <?php echo icon('lock'); ?><?php echo e(trans('entities.books_permissions_active')); ?>

                    <?php endif; ?>
                </div>
            <?php endif; ?>
        </div>
    </div>

    <div class="actions mb-xl">
        <h5><?php echo e(trans('common.actions')); ?></h5>
        <div class="icon-list text-primary">

            <?php if(userCan('page-create', $book)): ?>
                <a href="<?php echo e($book->getUrl('/create-page')); ?>" class="icon-list-item">
                    <span><?php echo icon('add'); ?></span>
                    <span><?php echo e(trans('entities.pages_new')); ?></span>
                </a>
            <?php endif; ?>
            <?php if(userCan('chapter-create', $book)): ?>
                <a href="<?php echo e($book->getUrl('/create-chapter')); ?>" class="icon-list-item">
                    <span><?php echo icon('add'); ?></span>
                    <span><?php echo e(trans('entities.chapters_new')); ?></span>
                </a>
            <?php endif; ?>

            <hr class="primary-background">

            <?php if(userCan('book-update', $book)): ?>
                <a href="<?php echo e($book->getUrl('/edit')); ?>" class="icon-list-item">
                    <span><?php echo icon('edit'); ?></span>
                    <span><?php echo e(trans('common.edit')); ?></span>
                </a>
                <a href="<?php echo e($book->getUrl('/sort')); ?>" class="icon-list-item">
                    <span><?php echo icon('sort'); ?></span>
                    <span><?php echo e(trans('common.sort')); ?></span>
                </a>
            <?php endif; ?>
            <?php if(userCan('book-create-all')): ?>
                <a href="<?php echo e($book->getUrl('/copy')); ?>" class="icon-list-item">
                    <span><?php echo icon('copy'); ?></span>
                    <span><?php echo e(trans('common.copy')); ?></span>
                </a>
            <?php endif; ?>
            <?php if(userCan('restrictions-manage', $book)): ?>
                <a href="<?php echo e($book->getUrl('/permissions')); ?>" class="icon-list-item">
                    <span><?php echo icon('lock'); ?></span>
                    <span><?php echo e(trans('entities.permissions')); ?></span>
                </a>
            <?php endif; ?>
            <?php if(userCan('book-delete', $book)): ?>
                <a href="<?php echo e($book->getUrl('/delete')); ?>" class="icon-list-item">
                    <span><?php echo icon('delete'); ?></span>
                    <span><?php echo e(trans('common.delete')); ?></span>
                </a>
            <?php endif; ?>

            <hr class="primary-background">

            <?php if(signedInUser()): ?>
                <?php echo $__env->make('entities.favourite-action', ['entity' => $book], \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
            <?php endif; ?>
            <?php if(userCan('content-export')): ?>
                <?php echo $__env->make('entities.export-menu', ['entity' => $book], \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
            <?php endif; ?>
        </div>
    </div>

<?php $__env->stopSection(); ?>

<?php $__env->startSection('left'); ?>

    <?php echo $__env->make('entities.search-form', ['label' => trans('entities.books_search_this')], \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>

    <?php if($book->tags->count() > 0): ?>
        <div class="mb-xl">
            <?php echo $__env->make('entities.tag-list', ['entity' => $book], \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
        </div>
    <?php endif; ?>

    <?php if(count($bookParentShelves) > 0): ?>
        <div class="actions mb-xl">
            <h5><?php echo e(trans('entities.shelves_long')); ?></h5>
            <?php echo $__env->make('entities.list', ['entities' => $bookParentShelves, 'style' => 'compact'], \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
        </div>
    <?php endif; ?>

    <?php if(count($activity) > 0): ?>
        <div class="mb-xl">
            <h5><?php echo e(trans('entities.recent_activity')); ?></h5>
            <?php echo $__env->make('common.activity-list', ['activity' => $activity], \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
        </div>
    <?php endif; ?>
<?php $__env->stopSection(); ?>


<?php echo $__env->make('layouts.tri', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH /var/www/bookstack/resources/views/books/show.blade.php ENDPATH**/ ?>